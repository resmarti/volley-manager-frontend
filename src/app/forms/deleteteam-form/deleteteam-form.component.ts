import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TeamService } from '../../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'deleteteam-form',
  templateUrl: './deleteteam-form.component.html',
  styleUrls: ['./deleteteam-form.component.css']
})

export class DeleteTeamFormComponent implements OnInit {
  @Input() deleteTeam: Team | undefined;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  public onDeleteTeam(teamId: number): void {
    this.teamService.deleteTeam(teamId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTeams.emit();
        if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
