import { Component, OnInit } from '@angular/core';
import { Team } from '../interfaces/team';
import { Teammember } from '../interfaces/teammember';
import { TeamsService } from '../services/teams.service';
import { TeammembersService } from '../services/teammembers.service';
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
  public selectedTeam: Team | undefined;
  public selectedTeammember: Teammember | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string;
  public searchLength: number;
  public action: string | undefined;
  public modalTitle: string | undefined;
  public modalMessage: string | undefined;
  public modalAlert: string | undefined;
  public modalAlertType: string | undefined

  constructor(private teamsService: TeamsService, private teammembersService: TeammembersService, private searchTermService: SearchTearmService) {
    this.teams = [];
    this.fallbackTeams =[];
    this.searchTerm = "";
    this.searchLength = 0;
   }
  ngOnInit(): void {
    //get teams from the api
    this.getTeams();
    //subscribe to search term service to get search terms from parent
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> {
      this.searchTerm=searchTerm;
      this.searchTeams(this.searchTerm);
    })
  }

  //method to get teams from the api
  public getTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: (response: Team[]) => {
        this.teams = response;
        this.fallbackTeams = this.teams;
        this.searchTeams(this.searchTerm)
      },
      error: (error: HttpErrorResponse) => {
        this.alert=error.message;
        this.alertType="danger";
      }
    });
  }

  //method to search teams
  public searchTeams(key: string): void {
    //reset teams if characters are removed
    if (this.searchLength>key.length) {
      this.teams=this.fallbackTeams;
    }
    //actual search within teams
    const results: Team[] = [];
    for (const team of this.teams) {
      //Search in team members within teams (I suspect this will get slow very fast)
      let found: boolean = false;
      let teammembers : Array<Teammember> | undefined = team.teamMembersEager ;
      teammembers?.forEach(teammember => {
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
    //reset result if nothing is found
    if (results.length === 0 || !key) {
      this.teams=this.fallbackTeams;
    }; 
    //show alert if nothing is found and there is a search term
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden! Es werden alle Teams angezeigt."
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
  public onOpenModal(mode: string, team?: Team, teammember?: Teammember): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    switch (mode) {
      case 'add':
        button.setAttribute('data-bs-target', '#addTeamModal');
        break;
      case 'edit': 
        this.selectedTeam = team;
        button.setAttribute('data-bs-target', '#updateTeamModal');
        break;
      case 'deleteTeam':
        this.action="delete";
        this.selectedTeam=team;
        this.modalTitle = "Team löschen";
        this.modalMessage = "Bist du sicher, dass du das die Team " + this.selectedTeam?.teamName + " löschen möchtest?";
        button.setAttribute('data-bs-target', '#confirmModal');
        break;
      case 'removeTeammemberFromTeam':
        this.action="removeTeammemberFromTeam";
        this.selectedTeam=team;
        this.selectedTeammember=teammember;
        this.modalTitle = "Teammitglied aus Team entfernen";
        this.modalMessage = "Bist du sicher, dass du das Teammitglied " + this.selectedTeammember?.firstName + " " + this.selectedTeammember?.lastName + " aus dem Team " + this.selectedTeam?.teamName + " entfernen möchtest?";
        button.setAttribute('data-bs-target', '#confirmModal');
        break;
      case 'addTeammemberToTeam':
        this.selectedTeam = team;
        this.modalTitle = "Mitglied zum Team " + this.selectedTeam?.teamName + " hinzufügen";
        button.setAttribute('data-bs-target', '#selectTeammemberModal');
        break;
    }
    container?.appendChild(button);
    button.click();
  }

  //method to be called after confirmation in confirm modal
  public confirmedAction(): void {
    if(this.action=="delete") {
      this.onDeleteTeam();
    }
    else if (this.action=="selectedTeammemberFromTeam") {
      this.onRemoveTeammemberFromTeam();
    }
  }

  //method to be called for deleting a team after confirmation
  public onDeleteTeam(): void {
    this.teamsService.deleteTeam(this.selectedTeam!.teamId).subscribe({
      next: () => {
        this.getTeams();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for removin a teammember from a team after confirmation
  public onRemoveTeammemberFromTeam(): void {
    this.teammembersService.removeTeammemberFromTeam(this.selectedTeam!.teamId, this.selectedTeammember!.id).subscribe({
      next: () => {
        this.getTeams();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

    //method to be called for adding a teammember to a team
    public onAddTeammemberToTeam(teammember: Teammember): void {
      this.teammembersService.addTeammemberToTeam(this.selectedTeam!.teamId, teammember.id).subscribe({
        next: () => {
          this.getTeams();
          this.alert=teammember.firstName + " " + teammember.lastName + " wurde zum Team " + this.selectedTeam?.teamName + " hinzugefügt!";
          this.alertType="success";
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.alert=teammember.firstName + " " + teammember.lastName + " wurde NICHT zum Team " + this.selectedTeam?.teamName + " hinzugefügt! Vermutlich ist das Alter von " + teammember.firstName + " " + teammember.lastName + " zu hoch." ;
          this.alertType="danger";
        }
      });
    }

}
