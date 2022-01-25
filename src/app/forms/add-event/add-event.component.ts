import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VolleyEvent } from 'src/app/interfaces/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Output("getEvents") getEvents: EventEmitter<any> = new EventEmitter();

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  //method to be called for adding a event after form completion
  public onAddEvent(addForm: NgForm): void {
    this.eventsService.addEvent(addForm.value).subscribe({
      next: (response: VolleyEvent) => {
        console.log(response);
        this.getEvents.emit();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

}
