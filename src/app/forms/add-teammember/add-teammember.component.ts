import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { TeammembersService } from '../../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Teammember } from 'src/app/interfaces/teammember';

@Component({
  selector: 'app-add-teammember',
  templateUrl: './add-teammember.component.html',
  styleUrls: ['./add-teammember.component.css']
})
export class AddTeammemberComponent implements OnInit {
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();

  constructor(private teammembersService: TeammembersService) { }

  ngOnInit(): void {
  }

  //method to be called for adding a teammember after form completion
  public onAddTeammember(addForm: NgForm): void {
    this.teammembersService.addTeammember(addForm.value).subscribe({
      next: (response: Teammember) => {
        this.getTeammembers.emit();
          addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
   }
}
