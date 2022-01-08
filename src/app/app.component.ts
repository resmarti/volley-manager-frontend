import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent implements OnInit {
  public persons: Person[];
  public fallbackPersons: Person[];
  public editPerson: Person | undefined;
  public deletePerson: Person | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchLength: number;

  constructor(private personService: PersonService){
    this.persons = [];
    this.fallbackPersons =[];
    this.searchLength = 0;
  }

  ngOnInit() {
    this.getPersons();
    console.log(this.alert);
  } 

  public getPersons(): void {
    this.personService.getPersons().subscribe(
      (response: Person[]) => {
        this.persons = response;
        this.fallbackPersons = this.persons;
        console.log(this.persons);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPerson(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.persons=this.fallbackPersons;
    }
    const results: Person[] = [];
    for (const person of this.persons) {
      if (person.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.street.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.emailaddressPlayer.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.mobileNumberPlayer.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(person);
      }
    }
    this.persons = results;
    if (results.length === 0 || !key) {
      this.getPersons();
    }; 
    if (results.length ===0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden!"
      this.alertType="warning"
    }
    else {
      this.alert=null;
    }
    this.searchLength = key.length;
    console.log(this.searchLength)
  }

  public onOpenModal(mode: string, person?: Person): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addPersonModal')
    }
    else if(mode === 'edit') {
      this.editPerson = person;
      button.setAttribute('data-bs-target', '#updatePersonModal')
    }
    else if(mode === 'delete') {
      this.deletePerson = person;
      button.setAttribute('data-bs-target', '#deletePersonModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
