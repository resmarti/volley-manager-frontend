import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';
import { VolleyEvent } from 'src/app/interfaces/event';
import { EventsService } from 'src/app/services/events.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
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
export class EditEventComponent implements OnInit {
  @Input() editEvent: VolleyEvent | undefined;
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  public onUpdateEvent(event: VolleyEvent): void {
    console.log(event);
    this.eventsService.updateEvent(event).subscribe(
      (response: VolleyEvent) => {
        console.log(response);
        this.getEvents.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
