import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Teammember } from 'src/app/interfaces/teammember';
import { TeammembersService } from '../../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-teammember',
  templateUrl: './delete-teammember.component.html',
  styleUrls: ['./delete-teammember.component.css']
})
export class DeleteTeammemberComponent implements OnInit {
  @Input() deleteTeammember: Teammember | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private teammembersService: TeammembersService) { }

  ngOnInit(): void {
  }

  //method to be called for deleting a teammember after confirmation
  public onDeleteTeammember(teammemberId: number): void {
    this.teammembersService.deleteTeammember(teammemberId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getTeammembers.emit();
        if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
