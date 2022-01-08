import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Person } from 'src/app/person';
import { PersonService } from '../../person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, animate, transition, style } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'editperson-form',
  templateUrl: './editperson-form.component.html',
  styleUrls: ['./editperson-form.component.css'],
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
export class EditPersonFormComponent implements OnInit {
  @Input() editPerson: Person | undefined;
  @Output("getPersons") getPersons: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  public onUpdatePerson(person: Person): void {
    this.personService.updatePerson(person).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
