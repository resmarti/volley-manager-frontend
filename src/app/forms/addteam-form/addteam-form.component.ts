import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamService } from '../../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'addteam-form',
  templateUrl: './addteam-form.component.html',
  styleUrls: ['./addteam-form.component.css']
})
export class AddTeamFormComponent implements OnInit {
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  public onAddTeam(addForm: NgForm): void {
    this.teamService.addTeam(addForm.value).subscribe(
      (response: Team) => {
        console.log(response);
        this.getTeams.emit();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

}
