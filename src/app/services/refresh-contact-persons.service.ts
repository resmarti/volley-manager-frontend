import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//service to ask for a refresh of contact persons between child components of the team member component
export class RefreshContactPersonsService {

  // Observable string sources
  private refreshContactPersonsSource = new BehaviorSubject<boolean>(false);

  // Observable string streams
  currentRefreshContactPersons = this.refreshContactPersonsSource.asObservable();

  // Service message commands
  announceRefreshContactPersons(refreshContactPersons: boolean) {
    this.refreshContactPersonsSource.next(refreshContactPersons);
  }

  constructor() { }
}
