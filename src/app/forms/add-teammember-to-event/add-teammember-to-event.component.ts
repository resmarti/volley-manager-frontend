import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VolleyEvent } from '../../interfaces/event';
import { Teammember } from '../../interfaces/teammember';
import { TeammembersService } from '../../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-teammember-to-event',
  templateUrl: './add-teammember-to-event.component.html',
  styleUrls: ['./add-teammember-to-event.component.css']
})
export class AddTeammemberToEventComponent implements OnInit {
  @Input() addToEvent: VolleyEvent | undefined;
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();

  public teammembers: Teammember[];
  public fallbackTeammembers: Teammember[];
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchLength: number;

  constructor(private teammembersService: TeammembersService, private eventsService: EventsService) { 
    this.teammembers = [];
    this.fallbackTeammembers =[];
    this.searchLength = 0;
  }

  ngOnInit(): void {
    //get existing teammembers
    this.getTeammembers();
  }

  //method to get existing teammembers from api
  public getTeammembers(): void {
    this.teammembersService.getTeammembers().subscribe({
      next: (response: Teammember[]) => {
        this.teammembers = response;
        this.fallbackTeammembers = this.teammembers;
        console.log(this.teammembers);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for adding a teammember to an event
  public onAddTeammemberToEvent(teammember: Teammember, addToEvent: VolleyEvent): void {
    this.eventsService.addTeammemberToEvent(addToEvent.eventId, teammember.id).subscribe({
      next: () => {
        this.getEvents.emit();
        this.alert=teammember.firstName + " " + teammember.lastName + " wurde zum Event " + addToEvent.eventName + " hinzugefügt!";
        this.alertType="success";
        /*if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }*/
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.alert=teammember.firstName + " " + teammember.lastName + " wurde NICHT zum Event " + addToEvent.eventName + " hinzugefügt!" ;
        this.alertType="danger";
      }
    });
  }

  //method to search for existing teammembers within the add modal
  public searchTeammember(key: string): void {
    //reseting teammembers, if characters are removed
    if (this.searchLength>key.length) {
      this.teammembers=this.fallbackTeammembers;
    }
    //actual search within teammembers array
    const results: Teammember[] = [];
    for (const teammember of this.teammembers) {
      if ((teammember.firstName + " " + teammember.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.dateOfBirth.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teammember);
      }
    }
    this.teammembers = results;
    //reset result if nothing is found
    if (results.length === 0 || !key) {
      this.getTeammembers();
    };
    //show alert if nothing is found and there is a search term  
    if (results.length ===0) {
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

}
