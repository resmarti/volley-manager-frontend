import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TeamService } from '../../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'editteam-form',
  templateUrl: './editteam-form.component.html',
  styleUrls: ['./editteam-form.component.css'],
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
export class EditTeamFormComponent implements OnInit {
  @Input() editTeam: Team | undefined;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  public onUpdateTeam(team: Team): void {
    console.log(team);
    this.teamService.updateTeam(team).subscribe(
      (response: Team) => {
        console.log(response);
        this.getTeams.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
