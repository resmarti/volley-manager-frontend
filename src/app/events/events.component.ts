import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VolleyEvent } from '../interfaces/event';
import { Team } from '../interfaces/team';
import { Teammember } from '../interfaces/teammember';
import { EventsService } from '../services/events.service';
import { SearchTearmService } from '../services/search-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public events: VolleyEvent[];
  public fallbackEvents: VolleyEvent[];
  public editEvent: VolleyEvent | undefined;
  public deleteEvent: VolleyEvent | undefined;
  public addToEvent: VolleyEvent | undefined;
  public removeFromEvent: VolleyEvent | undefined;
  public removeTeammember: Teammember | undefined;
  public removeTeam: Team | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string;
  public searchLength: number;

  constructor(private eventsService: EventsService, private searchTermService: SearchTearmService) {
    this.events = [];
    this.fallbackEvents = [];
    this.searchTerm = ""
    this.searchLength = 0;
   }

  ngOnInit(): void {
    this.getEvents();
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> {
      this.searchTerm=searchTerm;
      this.searchTeammember(this.searchTerm);
    })
  }

  public getEvents(): void {
    this.eventsService.getEvents().subscribe(
      (response: VolleyEvent[]) => {
        this.events = response;
        this.fallbackEvents = this.events;
        this.searchTeammember(this.searchTerm);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTeammember(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.events=this.fallbackEvents;
    }
    const results: VolleyEvent[] = [];
    for (const event of this.events) {
      //Search in connected Teammembers (I suspect this will get slow very fast)
      let found: boolean = false;
      let teammembers : Array<Teammember> | undefined = event.teamMembersEager ;
      teammembers?.forEach(teammember => {
        if ((teammember.firstName + " " + teammember.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.street.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.mobile.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          found = true;
        }
      })
      //Search in connected Teams
      let teams : Array<Team> | undefined = event.teamsEager ;
      teams?.forEach(team => {
        console.log(team.teamName);
        if (team.teamName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          found = true;
        }
      })
      if (event.eventName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || event.eventLocation.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || event.eventDate.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || found) {
        results.push(event);
      }
    }
    this.events = results;
    if (results.length === 0 || !key) {
      this.events=this.fallbackEvents;
    }; 
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden! Es werden alle Events angezeigt."
      this.alertType="warning"
    }
    else {
      this.alert=null;
    }
    this.searchLength = key.length;
    console.log(this.searchLength)
  }

  public onOpenModal(mode: string, event?: VolleyEvent, teammember?: Teammember, team?: Team): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addEventModal')
    }
    else if(mode === 'edit') {
      this.editEvent = event;
      button.setAttribute('data-bs-target', '#updateEventModal')
    }
    else if(mode === 'delete') {
      this.deleteEvent = event;
      button.setAttribute('data-bs-target', '#deleteEventModal')
    }
    else if(mode === 'addteamtoevent') {
      this.addToEvent = event;
      button.setAttribute('data-bs-target', '#addTeamToEventModal')
    }
    else if(mode === 'addteammembertoevent') {
      this.addToEvent = event;
      button.setAttribute('data-bs-target', '#addTeammemberToEventModal')
    }
    else if(mode === 'removeteammemberfromevent') {
      this.removeFromEvent = event;
      this.removeTeammember = teammember;
      button.setAttribute('data-bs-target', '#removeTeammemberFromEventModal')
    }
    else if(mode === 'removeteamfromevent') {
      this.removeFromEvent = event;
      this.removeTeam = team;
      button.setAttribute('data-bs-target', '#removeTeamFromEventModal')
    }
    container?.appendChild(button);
    button.click();
  }

}
