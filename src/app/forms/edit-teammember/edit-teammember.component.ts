import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Teammember } from 'src/app/interfaces/teammember';
import { TeammembersService } from '../../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-edit-teammember',
  templateUrl: './edit-teammember.component.html',
  styleUrls: ['./edit-teammember.component.css'],
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
export class EditTeammemberComponent implements OnInit {
  @Input() editTeammember: Teammember | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private teammembersService: TeammembersService) { }

  ngOnInit(): void {
  }

  //method to be called for updating a teammember after form completion
  public onUpdateTeammember(teammember: Teammember): void {
    this.teammembersService.updateTeammember(teammember).subscribe({
      next: (response: Teammember) => {
        console.log(response);
        this.getTeammembers.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
