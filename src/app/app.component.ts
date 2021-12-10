import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public persons: Person[];

  constructor(private personService: PersonService){
    this.persons = [];
  }

  ngOnInit() {
    this.getPersons();
  } 

  public getPersons(): void {
    this.personService.getPersons().subscribe(
      (response: Person[]) => {
        this.persons = response;
        console.log(this.persons);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
