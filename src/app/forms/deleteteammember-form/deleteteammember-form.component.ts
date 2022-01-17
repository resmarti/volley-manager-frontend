import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Teammember } from 'src/app/interfaces/teammember';
import { TeammemberService } from '../../services/teammember.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'deleteteammember-form',
  templateUrl: './deleteteammember-form.component.html',
  styleUrls: ['./deleteteammember-form.component.css']
})

export class DeleteTeammemberFormComponent implements OnInit {
  @Input() deleteTeammember: Teammember | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private teammemberService: TeammemberService) { }

  ngOnInit(): void {
  }

  public onDeleteTeammember(teammemberId: number): void {
    this.teammemberService.deleteTeammemberForce(teammemberId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTeammembers.emit();
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
