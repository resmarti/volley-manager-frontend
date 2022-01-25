import { Component, OnInit, Output } from '@angular/core';
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
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string | undefined;

  constructor(private searchTermService: SearchTearmService){ }

  ngOnInit() {
    //subscripe to the search term service
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> this.searchTerm=searchTerm)
  } 

  //method to announce search term changes to child components
  public changeSearchTerm(searchTerm: string) {
    this.searchTermService.announceSearchTerm(searchTerm);
  }

}
