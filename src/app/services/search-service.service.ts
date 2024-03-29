import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//service to share search terms between components
export class SearchTearmService {

  // Observable string sources
  private searchTermSource = new BehaviorSubject<string>("");

  // Observable string streams
  currentSearchTerm = this.searchTermSource.asObservable();

  // Service message commands
  announceSearchTerm(searchTerm: string) {
    this.searchTermSource.next(searchTerm);
  }

  constructor() { }
}
