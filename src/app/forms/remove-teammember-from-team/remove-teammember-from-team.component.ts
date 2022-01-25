import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { Teammember } from 'src/app/interfaces/teammember';
import { TeammembersService } from '../../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-remove-teammember-from-team',
  templateUrl: './remove-teammember-from-team.component.html',
  styleUrls: ['./remove-teammember-from-team.component.css']
})
export class RemoveTeammemberFromTeamComponent implements OnInit {
  @Input() removeFromTeam: Team | undefined;
  @Input() removeTeammember: Teammember | undefined;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private teammembersService: TeammembersService) { }

  ngOnInit(): void {
  }

  //method to be called for removin a teammember from a team after confirmation
  public onRemoveTeammembersFromTeam(teamId: number, teammemberId: number): void {
    this.teammembersService.removeTeammemberFromTeam(teamId, teammemberId).subscribe({
      next: () => {
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