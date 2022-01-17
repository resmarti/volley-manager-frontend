import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { TeammemberService } from '../../services/teammember.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Teammember } from 'src/app/interfaces/teammember';

@Component({
  selector: 'addteammember-form', 
  templateUrl: './addteammember-form.component.html',
  styleUrls: ['./addteammember-form.component.css']
})
export class AddTeammemberFormComponent{
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();

  constructor(private teammemberService: TeammemberService) { }

  ngOnInit(): void {
  }

  public onAddTeammember(addForm: NgForm): void {
    console.log(addForm.value);
    this.teammemberService.addTeammember(addForm.value).subscribe(
      (response: Teammember) => {
        console.log(response);
        this.getTeammembers.emit();
          addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
     );
   }
}