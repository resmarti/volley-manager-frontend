import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { VolleyEvent } from 'src/app/interfaces/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  @Input() deleteEvent: VolleyEvent | undefined;
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  //method to be called for deleting an event after confirmation
  public onDeleteEvent(eventId: number): void {
    this.eventsService.deleteEvent(eventId).subscribe({
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
