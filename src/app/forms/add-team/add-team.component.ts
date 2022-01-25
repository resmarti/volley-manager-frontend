import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamsService } from '../../services/teams.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

  //method to be called for adding a team after form completion
  public onAddTeam(addForm: NgForm): void {
    this.teamsService.addTeam(addForm.value).subscribe({
      next: (response: Team) => {
        console.log(response);
        this.getTeams.emit();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

}
