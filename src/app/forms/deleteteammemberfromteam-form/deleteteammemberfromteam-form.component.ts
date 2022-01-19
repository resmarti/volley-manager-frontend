import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { Teammember } from 'src/app/interfaces/teammember';
import { TeammemberService } from '../../services/teammember.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'deleteteammemberfromteam-form',
  templateUrl: './deleteteammemberfromteam-form.component.html',
  styleUrls: ['./deleteteammemberfromteam-form.component.css']
})

export class DeleteTeammemberFromTeamFormComponent implements OnInit {
  @Input() removeFromTeam: Team | undefined;
  @Input() removeTeammember: Teammember | undefined;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private teammemberService: TeammemberService) { }

  ngOnInit(): void {
  }

  public onRemoveTeammembersFromTeam(teamId: number, teammemberId: number): void {
    this.teammemberService.removeTeammemberFromTeam(teamId, teammemberId).subscribe(
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
