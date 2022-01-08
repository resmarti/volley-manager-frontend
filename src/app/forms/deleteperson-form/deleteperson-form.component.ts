import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Person } from 'src/app/person';
import { PersonService } from '../../person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'deleteperson-form',
  templateUrl: './deleteperson-form.component.html',
  styleUrls: ['./deleteperson-form.component.css']
})
export class DeletePersonFormComponent implements OnInit {
  @Input() deletePerson: Person | undefined;
  @Output("getPersons") getPersons: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  public onDeletePerson(personId: number): void {
    this.personService.deletePerson(personId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPersons.emit();
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
