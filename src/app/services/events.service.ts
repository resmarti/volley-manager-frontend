import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VolleyEvent } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getEvents(): Observable<VolleyEvent[]> {
    return this.http.get<VolleyEvent[]>(`${this.apiServerUrl}/event/all`);
  }

  public addEvent(event: VolleyEvent): Observable<VolleyEvent> {
    return this.http.post<VolleyEvent>(`${this.apiServerUrl}/event/add`, event);
  }
  
  public updateEvent(event: VolleyEvent): Observable<VolleyEvent> {
    return this.http.put<VolleyEvent>(`${this.apiServerUrl}/event/update`, event);
  }
  
  public deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/event/delete/${eventId}`);
  }

  public addTeamToEvent(eventId: number, teamId: number): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/event/addteamtoevent/${eventId}/${teamId}`,'');
  }

  public addTeammemberToEvent(eventId: number, teammemberId: number): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/event/addteammembertoevent/${eventId}/${teammemberId}`,'');
  }

  public removeTeamFromEvent(eventId: number, teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/event/removeteamfromevent/${eventId}/${teamId}`);
  }

  public removeTeammemberFromEvent(eventId: number, teammemberId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/event/removeteammembertfromevent/${eventId}/${teammemberId}`);
  }
}
