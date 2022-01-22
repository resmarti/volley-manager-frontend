
import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, animate, transition, style } from '@angular/animations';
import { ContactPerson } from 'src/app/interfaces/contacperson';
import { ContactPersonService } from 'src/app/services/contactperson.service';

@Component({
  selector: 'app-edit-contact-person',
  templateUrl: './edit-contact-person.component.html',
  styleUrls: ['./edit-contact-person.component.css'],
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

export class EditContactPersonComponent implements OnInit {
  @Input() editContactPerson: ContactPerson | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private contactPersonService: ContactPersonService) { }

  ngOnInit(): void {
  }

  public onUpdateContactPerson(contactPerson: ContactPerson): void {
    this.contactPersonService.updateContactPerson(contactPerson).subscribe(
      (response: ContactPerson) => {
        console.log(response);
        this.getTeammembers.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}