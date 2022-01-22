import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Teammember } from './interfaces/teammember';
import { TeammemberService } from './services/teammember.service';
import { trigger, animate, transition, style } from '@angular/animations';
import { SearchTearmService } from './services/search-service.service';

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
  public teammembers: Teammember[];
  public fallbackTeammembers: Teammember[];
  public editTeammember: Teammember | undefined;
  public deleteTeammember: Teammember | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string | undefined;

  constructor(private teammemberService: TeammemberService, private searchTermService: SearchTearmService){
    this.teammembers = [];
    this.fallbackTeammembers =[];
  }

  ngOnInit() {
    this.getTeammembers();
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> this.searchTerm=searchTerm)
  } 

  public getTeammembers(): void {
    this.teammemberService.getTeammembers().subscribe(
      (response: Teammember[]) => {
        this.teammembers = response;
        this.fallbackTeammembers = this.teammembers;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public changeSearchTerm(searchTerm: string) {
    this.searchTermService.announceSearchTerm(searchTerm);
  }

}
