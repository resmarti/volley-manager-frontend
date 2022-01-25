import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TeamsService } from '../../services/teams.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.css']
})
export class DeleteTeamComponent implements OnInit {
  @Input() deleteTeam: Team | undefined;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

  //method to be called for deleting a team after confirmation
  public onDeleteTeam(teamId: number): void {
    this.teamsService.deleteTeam(teamId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getTeams.emit();
        if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
