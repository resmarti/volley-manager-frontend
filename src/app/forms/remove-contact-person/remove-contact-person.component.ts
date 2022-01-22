import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Teammember } from 'src/app/interfaces/teammember';
import { ContactPersonService } from 'src/app/services/contactperson.service';
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

  constructor(private contactPersonService: ContactPersonService, private refreshContactPersonsService: RefreshContactPersonsService) { }

  ngOnInit(): void {
    this.refreshContactPersonsService.currentRefreshContactPersons.subscribe(refreshContactPersons=> {
      this.refreshContactPersons=refreshContactPersons;
    })
  }

  public onRemoveContactPerson(contactPersonId: number, teammemberId: number): void {
    this.contactPersonService.removeContactPersonFromTeammember(contactPersonId, teammemberId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTeammembers.emit();
        this.refreshContactPersons=true;
        this.contactPersonsRefresh(this.refreshContactPersons);
        if (this.closeRemoveModal) {
          this.closeRemoveModal.nativeElement.click();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public contactPersonsRefresh(refreshContactPerson: boolean) {
    this.refreshContactPersonsService.announceRefreshContactPersons(refreshContactPerson);
  }

}
