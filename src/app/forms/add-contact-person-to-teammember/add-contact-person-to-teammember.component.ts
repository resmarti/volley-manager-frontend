import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactPerson } from 'src/app/interfaces/contacperson';
import { Teammember } from 'src/app/interfaces/teammember';
import { ContactPersonService } from 'src/app/services/contactperson.service';
import { RefreshContactPersonsService } from 'src/app/services/refresh-contact-persons.service';

@Component({
  selector: 'app-add-contact-person-to-teammember',
  templateUrl: './add-contact-person-to-teammember.component.html',
  styleUrls: ['./add-contact-person-to-teammember.component.css']
})
export class AddContactPersonToTeammemberComponent implements OnInit {
  @Input() addToTeammember: Teammember | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();

  public refreshContactPersons: boolean | undefined;
  
  public contactPersons: ContactPerson[];
  public fallbackContactPersons: ContactPerson[];
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchLength: number;

  constructor(private contactPersonService: ContactPersonService, private refreshContactPersonsService: RefreshContactPersonsService) {
    this.contactPersons = [];
    this.fallbackContactPersons =[];
    this.searchLength = 0;
   }

  ngOnInit(): void {
    this.getContactPersons();
    this.refreshContactPersonsService.currentRefreshContactPersons.subscribe(refreshContactPersons=> {
      this.refreshContactPersons=refreshContactPersons;
      if(this.refreshContactPersons) {
        this.getContactPersons();
        this.contactPersonsRefresh(this.refreshContactPersons);
      }
    })
  }

  public getContactPersons(): void {
    this.contactPersonService.getContactPersons().subscribe(
      (response: ContactPerson[]) => {
        this.contactPersons = response;
        this.fallbackContactPersons = this.contactPersons;
        console.log(this.contactPersons);
        this.refreshContactPersons=false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddExistingContactPerson(contactPersonId: number, addToTeammember: number): void {
    this.contactPersonService.addExistingContactPersonToTeammember(contactPersonId, addToTeammember).subscribe(
      (response: void) => {
        this.getTeammembers.emit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
     );
   }


  public onAddNewContactPerson(addForm: NgForm, addToTeammemberId: number): void {
    console.log(addForm.value);
    this.contactPersonService.addNewContactPersonToTeammember(addForm.value, addToTeammemberId).subscribe(
      (response: ContactPerson) => {
        console.log(response);
        this.getTeammembers.emit();
          addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
     );
   }

   public searchContactPerson(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.contactPersons=this.fallbackContactPersons;
    }
    const results: ContactPerson[] = [];
    for (const contactPerson of this.contactPersons) {
      if ((contactPerson.firstName + " " + contactPerson.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || (contactPerson.street + " " + contactPerson.streetNb).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || (contactPerson.postalCode + " " + contactPerson.location).toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(contactPerson);
      }
    }
    this.contactPersons = results;
    if (results.length === 0 || !key) {
      this.getContactPersons();
    }; 
    if (results.length ===0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden!"
      this.alertType="warning"
    }
    else {
      this.alert=null;
    }
    this.searchLength = key.length;
    console.log(this.searchLength)
  }

  public contactPersonsRefresh(refreshContactPerson: boolean) {
    this.refreshContactPersonsService.announceRefreshContactPersons(refreshContactPerson);
  }

}
