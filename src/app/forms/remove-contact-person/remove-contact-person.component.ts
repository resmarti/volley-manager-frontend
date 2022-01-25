import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Teammember } from 'src/app/interfaces/teammember';
import { ContactPersonsService } from 'src/app/services/contact-persons.service';
import { RefreshContactPersonsService } from 'src/app/services/refresh-contact-persons.service';

@Component({
  selector: 'app-remove-contact-person',
  templateUrl: './remove-contact-person.component.html',
  styleUrls: ['./remove-contact-person.component.css']
})

export class RemoveContactPersonComponent implements OnInit {
  @Input() removeContactPerson: Teammember | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeRemoveModal') closeRemoveModal: ElementRef | undefined;

  public refreshContactPersons: boolean | undefined;

  constructor(private contactPersonsService: ContactPersonsService, private refreshContactPersonsService: RefreshContactPersonsService) { }

  ngOnInit(): void {
    //subscribe to service for announcing a contact person refresh
    this.refreshContactPersonsService.currentRefreshContactPersons.subscribe(refreshContactPersons=> {
      this.refreshContactPersons=refreshContactPersons;
    })
  }

  //method to be called for removing a contact person from teammember after confirmation
  public onRemoveContactPerson(contactPersonId: number, teammemberId: number): void {
    this.contactPersonsService.removeContactPersonFromTeammember(contactPersonId, teammemberId).subscribe({
      next: () => {
        this.getTeammembers.emit();
        this.refreshContactPersons=true;
        //ask for a refresh of existing contact persons
        this.contactPersonsRefresh(this.refreshContactPersons);
        if (this.closeRemoveModal) {
          this.closeRemoveModal.nativeElement.click();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to ask for a refresh of existing contact persons in sibling component
  public contactPersonsRefresh(refreshContactPerson: boolean) {
    this.refreshContactPersonsService.announceRefreshContactPersons(refreshContactPerson);
  }

}
