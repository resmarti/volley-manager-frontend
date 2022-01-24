import { Component, OnInit } from '@angular/core';
import { Team } from '../interfaces/team';
import { Teammember } from '../interfaces/teammember';
import { TeamService } from '../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchTearmService } from '../services/search-service.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  public teams: Team[];
  public fallbackTeams: Team[];
  public editTeam: Team | undefined;
  public deleteTeam: Team | undefined;
  public addToTeam: Team | undefined;
  public removeFromTeam: Team | undefined;
  public removeTeammember: Teammember | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string;
  public searchLength: number;
  public team: any | undefined;
  public teammember: any | undefined;

  constructor(private teamService: TeamService, private searchTermService: SearchTearmService) {
    this.teams = [];
    this.fallbackTeams =[];
    this.searchTerm = "";
    this.searchLength = 0;
   }
  ngOnInit(): void {
    this.getTeams();
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> {
      this.searchTerm=searchTerm;
      this.searchTeams(this.searchTerm);
    })
  }

  public getTeams(): void {
    this.teamService.getTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
        this.fallbackTeams = this.teams;
        this.searchTeams(this.searchTerm)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTeams(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.teams=this.fallbackTeams;
    }
    const results: Team[] = [];
    for (const team of this.teams) {
      //Search in Teammembers (I suspect this will get slow very fast)
      let found: boolean = false;
      let teammembers : Array<Teammember> | undefined = team.teammembers ;
      teammembers?.forEach(teammember => {
        console.log(teammember.firstName);
        if ((teammember.firstName + " " + teammember.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.street.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || teammember.mobile.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          found = true;
        }
      })
      if (team.teamName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || found) {
        results.push(team);
      }
    }
    this.teams = results;
    if (results.length === 0 || !key) {
      this.teams=this.fallbackTeams;
    }; 
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden! Es werden alle Teams angezeigt."
      this.alertType="warning"
    }
    else {
      this.alert=null;
    }
    this.searchLength = key.length;
    console.log(this.searchLength)
  }

  public onOpenModal(mode: string, team?: Team, teammember?: Teammember): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addTeamModal')
    }
    else if(mode === 'edit') {
      this.editTeam = team;
      button.setAttribute('data-bs-target', '#updateTeamModal')
    }
    else if(mode === 'delete') {
      this.deleteTeam = team;
      button.setAttribute('data-bs-target', '#deleteTeamModal')
    }
    else if(mode === 'deleteteammember') {
      this.removeFromTeam = team;
      this.removeTeammember = teammember;
      button.setAttribute('data-bs-target', '#deleteTeammemberFromTeamModal')
    }
    else if(mode === 'addteammembertoteam') {
      this.addToTeam = team;
      button.setAttribute('data-bs-target', '#addTeammemberToTeamModal')
    }
    container?.appendChild(button);
    button.click();
  }

}
