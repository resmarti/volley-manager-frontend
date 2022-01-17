import { Component, OnInit } from '@angular/core';
import { Team } from '../interfaces/team';
import { Teammember } from '../interfaces/teammember';
import { TeamService } from '../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  public removeFromTeam: Team | undefined;
  public removeTeammember: Teammember | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchLength: number;
  public team: any | undefined;
  public teammember: any | undefined;

  constructor(private teamService: TeamService) {
    this.teams = [];
    this.fallbackTeams =[];
    this.searchLength = 0;
   }
  ngOnInit(): void {
    this.getTeams();
    //console.log(this.teams);
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
    container?.appendChild(button);
    button.click();
  }

}
