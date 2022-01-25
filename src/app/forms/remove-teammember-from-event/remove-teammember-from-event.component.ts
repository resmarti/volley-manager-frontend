import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { VolleyEvent } from 'src/app/interfaces/event';
import { Teammember } from 'src/app/interfaces/teammember';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-remove-teammember-from-event',
  templateUrl: './remove-teammember-from-event.component.html',
  styleUrls: ['./remove-teammember-from-event.component.css']
})
export class RemoveTeammemberFromEventComponent implements OnInit {
  @Input() removeFromEvent: VolleyEvent | undefined;
  @Input() removeTeammember: Teammember | undefined;
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  //method to be called for removing a teammember from an event after confirmation
  public onRemoveTeammembersFromEvent(eventId: number, teammemberId: number): void {
    this.eventsService.removeTeammemberFromEvent(eventId, teammemberId).subscribe({
      next: () => {
        this.getEvents.emit();
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
