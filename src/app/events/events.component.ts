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
  public selectedEvent: VolleyEvent | undefined;
  public selectedTeammember: Teammember | undefined;
  public selectedTeam: Team | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string;
  public searchLength: number;
  public action: string | undefined;
  public confirmTitle: string | undefined;
  public confirmMessage: string | undefined;

  constructor(private eventsService: EventsService, private searchTermService: SearchTearmService) {
    this.events = [];
    this.fallbackEvents = [];
    this.searchTerm = ""
    this.searchLength = 0;
   }

  ngOnInit(): void {
    //get events from the api
    this.getEvents();
      //subscribe to search term service to get search terms from parent
      this.searchTermService.currentSearchTerm.subscribe(searchTerm=> {
      this.searchTerm=searchTerm;
      this.searchTeammember(this.searchTerm);
    })
  }

  //method to get events from the api
  public getEvents(): void {
    this.eventsService.getEvents().subscribe({
      next: (response: VolleyEvent[]) => {
        this.events = response;
        this.fallbackEvents = this.events;
        this.searchTeammember(this.searchTerm);
      },
      error: (error: HttpErrorResponse) => {
        this.alert=error.message;
        this.alertType="danger";
      }
    });
  }

  //method to search events
  public searchTeammember(key: string): void {
    //reset events if characters are removed
    if (this.searchLength>key.length) {
      this.events=this.fallbackEvents;
    }
    //actual search within events
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
    //reset result if nothing is found
    if (results.length === 0 || !key) {
      this.events=this.fallbackEvents;
    };
    //show alert if nothing is found and there is a search term 
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden! Es werden alle Events angezeigt."
      this.alertType="warning"
    }
    //else remove the alert
    else {
      this.alert=null;
    }
    //set search term length to detect character removal
    this.searchLength = key.length;
  }

  //method to open various modals
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
      this.selectedEvent = event;
      button.setAttribute('data-bs-target', '#updateEventModal')
    }
    else if(mode === 'addteamtoevent') {
      this.selectedEvent = event;
      button.setAttribute('data-bs-target', '#addTeamToEventModal')
    }
    else if(mode === 'addteammembertoevent') {
      this.selectedEvent = event;
      button.setAttribute('data-bs-target', '#addTeammemberToEventModal')
    }
    else if(mode === 'deleteEvent') {
      this.action="delete"
      this.selectedEvent=event;
      this.confirmTitle = "Event löschen";
      this.confirmMessage = "Bist du sicher, dass du das die Event " + this.selectedEvent?.eventName + " löschen möchtest?"
      button.id = "toggleConfirmModal";
      button.setAttribute('data-bs-target', '#confirmModal')
    }
    else if(mode === 'removeTeamFromEvent') {
      this.action="removeTeamFromEvent";
      this.selectedEvent=event;
      this.selectedTeam=team;
      this.confirmTitle = "Team aus Event entfernen";
      this.confirmMessage = "Bist du sicher, dass du das Team " + this.selectedTeam?.teamName + " aus dem Event " + this.selectedEvent?.eventName + " entfernen möchtest?"
      button.id = "toggleConfirmModal";
      button.setAttribute('data-bs-target', '#confirmModal')
    }
    else if(mode === 'removeTeammemberFromEvent') {
      this.action="removeTeammemberFromEvent";
      this.selectedEvent=event;
      this.selectedTeammember=teammember;
      this.confirmTitle = "Mitglied aus Event entfernen";
      this.confirmMessage = "Bist du sicher, dass du das Teammitglied " + this.selectedTeammember?.firstName + " " + this.selectedTeammember?.lastName + " aus dem Event " + this.selectedEvent?.eventName + " entfernen möchtest?"
      button.id = "toggleConfirmModal";
      button.setAttribute('data-bs-target', '#confirmModal')
    }
    container?.appendChild(button);
    button.click();
  }

  //method to be called after confirmation in confirm modal
  public confirmedAction(): void {
    if(this.action=="delete") {
      this.onDeleteEvent();
    }
    else if (this.action=="removeTeamFromEvent") {
      this.onRemoveTeamFromEvent()
    }
    else if (this.action=="removeTeammemberFromEvent") {
      this.onRemoveTeammemberFromEvent()
    }
  }

  //method to be called for deleting an event after confirmation
  public onDeleteEvent(): void {
    this.eventsService.deleteEvent(this.selectedEvent!.eventId).subscribe({
      next: () => {
        this.getEvents();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for removing a team from an event after confirmation
  public onRemoveTeamFromEvent(): void {
    this.eventsService.removeTeamFromEvent(this.selectedEvent!.eventId, this.selectedTeam!.teamId).subscribe({
      next: () => {
        this.getEvents();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for removing a teammember from an event after confirmation
  public onRemoveTeammemberFromEvent(): void {
    this.eventsService.removeTeammemberFromEvent(this.selectedEvent!.eventId, this.selectedTeammember!.id).subscribe({
      next: () => {
        this.getEvents();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public alertTest(string: String): void {
    alert(string);
  }

}
