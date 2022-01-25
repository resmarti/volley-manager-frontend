import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TeamsService } from '../../services/teams.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
  animations: [
    trigger('fade', [
      transition('void => active', [ // using status here for transition
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EditTeamComponent implements OnInit {
  @Input() editTeam: Team | undefined;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

  //method to be called for updating a team after form completion
  public onUpdateTeam(team: Team): void {
    this.teamsService.updateTeam(team).subscribe({
      next: (response: Team) => {
        console.log(response);
        this.getTeams.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
