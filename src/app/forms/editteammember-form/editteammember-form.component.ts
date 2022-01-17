import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Teammember } from 'src/app/interfaces/teammember';
import { TeammemberService } from '../../services/teammember.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'editteammember-form',
  templateUrl: './editteammember-form.component.html',
  styleUrls: ['./editteammember-form.component.css'],
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
export class EditTeammemberFormComponent implements OnInit {
  @Input() editTeammember: Teammember | undefined;
  @Output("getTeammembers") getTeammembers: EventEmitter<any> = new EventEmitter();

  public alert: any | undefined;
  public alertType: any | undefined;

  constructor(private teammemberService: TeammemberService) { }

  ngOnInit(): void {
  }

  public onUpdateTeammember(teammember: Teammember): void {
    this.teammemberService.updateTeammember(teammember).subscribe(
      (response: Teammember) => {
        console.log(response);
        this.getTeammembers.emit();
        this.alert="erfolgreich gespeichert";
        this.alertType="success";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
