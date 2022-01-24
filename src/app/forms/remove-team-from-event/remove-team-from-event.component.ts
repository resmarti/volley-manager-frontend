import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { VolleyEvent } from 'src/app/interfaces/event';
import { Team } from 'src/app/interfaces/team';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-remove-team-from-event',
  templateUrl: './remove-team-from-event.component.html',
  styleUrls: ['./remove-team-from-event.component.css']
})
export class RemoveTeamFromEventComponent implements OnInit {
  @Input() removeFromEvent: VolleyEvent | undefined;
  @Input() removeTeam: Team | undefined;
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  public onRemoveTeamFromEvent(eventId: number, teamId: number): void {
    this.eventsService.removeTeamFromEvent(eventId, teamId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEvents.emit();
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
