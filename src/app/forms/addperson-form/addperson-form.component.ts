import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PersonService } from '../../person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from 'src/app/person';

@Component({
    selector: 'addperson-form', 
    templateUrl: './addperson-form.component.html',
    styleUrls: ['./addperson-form.component.css']
})
export class AddPersonFormComponent{
    @Output("getPersons") getPersons: EventEmitter<any> = new EventEmitter();

    constructor(private personService: PersonService) { }

    ngOnInit(): void {
    }

    public onAddPerson(addForm: NgForm): void {
        this.personService.addPerson(addForm.value).subscribe(
          (response: Person) => {
            console.log(response);
            this.getPersons.emit();
            addForm.reset();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            addForm.reset();
          }
        );
      }
}