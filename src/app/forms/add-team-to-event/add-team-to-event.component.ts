import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VolleyEvent } from 'src/app/interfaces/event';
import { Team } from 'src/app/interfaces/team';
import { TeamsService } from 'src/app/services/teams.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-team-to-event',
  templateUrl: './add-team-to-event.component.html',
  styleUrls: ['./add-team-to-event.component.css']
})
export class AddTeamToEventComponent implements OnInit {
  @Input() addToEvent: VolleyEvent | undefined;
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();

  public teams: Team[];
  public fallbackTeams: Team[];
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchLength: number;

  constructor(private teamsService: TeamsService, private eventsService: EventsService) {
    this.teams = [];
    this.fallbackTeams =[];
    this.searchLength = 0;
   }

  ngOnInit(): void {
    //get existing teams
    this.getTeams();
  }

  //method to get existing teams from api
  public getTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: (response: Team[]) => {
        this.teams = response;
        this.fallbackTeams = this.teams;
        console.log(this.teams);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for adding a team to an event
  public onAddTeamToEvent(team: Team, addToEvent: VolleyEvent): void {
    this.eventsService.addTeamToEvent(addToEvent.eventId, team.teamId).subscribe({
      next: () => {
        this.getEvents.emit();
        this.alert=team.teamName + " wurde zum Event " + addToEvent.eventName + " hinzugefügt!";
        this.alertType="success";
        /*if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }*/
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.alert=team.teamName + " wurde NICHT zum Event " + addToEvent.eventName + " hinzugefügt!" ;
        this.alertType="danger";
      }
    });
  }

  //method to search for existing teams within the add modal
  public searchTeam(key: string): void {
    //reseting teams, if characters are removed
    if (this.searchLength>key.length) {
      this.teams=this.fallbackTeams;
    }
    //actual search within teams array
    const results: Team[] = [];
    for (const teammember of this.teams) {
      if (teammember.teamName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teammember);
      }
    }
    this.teams = results;
    //reset result if nothing is found
    if (results.length === 0 || !key) {
      this.getTeams();
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
