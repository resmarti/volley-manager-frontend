import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
