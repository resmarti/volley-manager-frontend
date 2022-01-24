import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VolleyEvent } from '../../interfaces/event';
import { Teammember } from '../../interfaces/teammember';
import { TeammemberService } from '../../services/teammember.service';
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

  constructor(private teammemberService: TeammemberService, private eventsService: EventsService) { 
    this.teammembers = [];
    this.fallbackTeammembers =[];
    this.searchLength = 0;
  }

  ngOnInit(): void {
    this.getTeammembers();
  }

  public getTeammembers(): void {
    this.teammemberService.getTeammembers().subscribe(
      (response: Teammember[]) => {
        this.teammembers = response;
        this.fallbackTeammembers = this.teammembers;
        console.log(this.teammembers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTeammemberToEvent(teammember: Teammember, addToEvent: VolleyEvent): void {
    this.eventsService.addTeammemberToEvent(addToEvent.eventId, teammember.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEvents.emit();
        this.alert=teammember.firstName + " " + teammember.lastName + " wurde zum Event " + addToEvent.eventName + " hinzugefügt!";
        this.alertType="success";
        /*if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }*/
      },
      (error: HttpErrorResponse) => {
        this.alert=teammember.firstName + " " + teammember.lastName + " wurde NICHT zum Event " + addToEvent.eventName + " hinzugefügt!" ;
        this.alertType="danger";
      }
    );
  }

  public searchTeammember(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.teammembers=this.fallbackTeammembers;
    }
    const results: Teammember[] = [];
    for (const teammember of this.teammembers) {
      if ((teammember.firstName + " " + teammember.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.dateOfBirth.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teammember);
      }
    }
    this.teammembers = results;
    if (results.length === 0 || !key) {
      this.getTeammembers();
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

}
