import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VolleyEvent } from 'src/app/interfaces/event';
import { Team } from 'src/app/interfaces/team';
import { TeamService } from 'src/app/services/team.service';
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

  constructor(private teamService: TeamService, private eventsService: EventsService) {
    this.teams = [];
    this.fallbackTeams =[];
    this.searchLength = 0;
   }

  ngOnInit(): void {
    this.getTeams();
  }

  public getTeams(): void {
    this.teamService.getTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
        this.fallbackTeams = this.teams;
        console.log(this.teams);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTeamToEvent(team: Team, addToEvent: VolleyEvent): void {
    this.eventsService.addTeamToEvent(addToEvent.eventId, team.teamId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEvents.emit();
        this.alert=team.teamName + " wurde zum Event " + addToEvent.eventName + " hinzugefügt!";
        this.alertType="success";
        /*if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }*/
      },
      (error: HttpErrorResponse) => {
        this.alert=team.teamName + " wurde NICHT zum Event " + addToEvent.eventName + " hinzugefügt!" ;
        this.alertType="danger";
      }
    );
  }

  public searchTeammember(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.teams=this.fallbackTeams;
    }
    const results: Team[] = [];
    for (const teammember of this.teams) {
      if (teammember.teamName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teammember);
      }
    }
    this.teams = results;
    if (results.length === 0 || !key) {
      this.getTeams();
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
