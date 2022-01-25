import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactPerson } from 'src/app/interfaces/contacperson';
import { Teammember } from 'src/app/interfaces/teammember';
import { ContactPersonsService } from 'src/app/services/contact-persons.service';
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

  constructor(private contactPersonsService: ContactPersonsService, private refreshContactPersonsService: RefreshContactPersonsService) {
    this.contactPersons = [];
    this.fallbackContactPersons =[];
    this.searchLength = 0;
   }

  ngOnInit(): void {
    //get existing contact persons
    this.getContactPersons();
    //subscribe to service to refresh contact persons externally
    this.refreshContactPersonsService.currentRefreshContactPersons.subscribe(refreshContactPersons=> {
      this.refreshContactPersons=refreshContactPersons;
      if(this.refreshContactPersons) {
        this.getContactPersons();
      }
    })
  }

  //method to get existing contact persons from api (can also be called from other components)
  public getContactPersons(): void {
    this.contactPersonsService.getContactPersons().subscribe({
      next: (response: ContactPerson[]) => {
        this.contactPersons = response;
        this.fallbackContactPersons = this.contactPersons;
        this.refreshContactPersons=false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for adding an existing contact person to a teammember
  public onAddExistingContactPerson(contactPersonId: number, addToTeammember: number): void {
    this.contactPersonsService.addExistingContactPersonToTeammember(contactPersonId, addToTeammember).subscribe({
      next: () => {
        this.getTeammembers.emit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
   }

  //method to be called for adding a new contact person to a teammember after form completion
  public onAddNewContactPerson(addForm: NgForm, addToTeammemberId: number): void {
    this.contactPersonsService.addNewContactPersonToTeammember(addForm.value, addToTeammemberId).subscribe({
      next: (response: ContactPerson) => {
        //refresh the teammembers on parent component
        this.getTeammembers.emit();
        //clear the form
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
   }

   //method to search for existing contact persons within the add modal
   public searchContactPerson(key: string): void {
    //reseting contact persons, if characters are removed
    if (this.searchLength>key.length) {
      this.contactPersons=this.fallbackContactPersons;
    }
    //actual search within contact persons array
    const results: ContactPerson[] = [];
    for (const contactPerson of this.contactPersons) {
      if ((contactPerson.firstName + " " + contactPerson.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || (contactPerson.street + " " + contactPerson.streetNb).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || (contactPerson.postalCode + " " + contactPerson.location).toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(contactPerson);
      }
    }
    this.contactPersons = results;
    //reset result if nothing is found
    if (results.length === 0 || !key) {
      this.contactPersons=this.fallbackContactPersons;
    };
    //show alert if nothing is found and there is a search term
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden!"
      this.alertType="warning"
    }
    //else remove the alert
    else {
      this.alert=null;
    }
    //set search term length to detect character removal
    this.searchLength = key.length;
  }

  //reseting the contact person refresh boolean 
  public contactPersonsRefresh(refreshContactPerson: boolean) {
    this.refreshContactPersonsService.announceRefreshContactPersons(refreshContactPerson);
  }

}
