import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Teammember } from "../interfaces/teammember";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
//Service to get team members from the api
export class TeammembersService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient) { }

    public getTeammembers(): Observable<Teammember[]> {
        return this.http.get<Teammember[]>(`${this.apiServerUrl}/teammember/all`);
    }

    public getTeammembersEager(): Observable<Teammember[]> {
      return this.http.get<Teammember[]>(`${this.apiServerUrl}/teammember/all-eager`);
    }

    public addTeammember(teammember: Teammember): Observable<Teammember> {
        return this.http.post<Teammember>(`${this.apiServerUrl}/teammember/add`, teammember);
      }
    
      public updateTeammember(teammember: Teammember): Observable<Teammember> {
        return this.http.put<Teammember>(`${this.apiServerUrl}/teammember/update`, teammember);
      }
    
      public deleteTeammember(teammemberId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/teammember/delete/${teammemberId}`);
      }

      public deleteTeammemberForce(teammemberId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/teammember/delete1/${teammemberId}`);
      }

      public removeTeammemberFromTeam(teamId: number, teammemberId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/teammember/removeteammemberfromteam/${teamId}/${teammemberId}`);
      }

      public addTeammemberToTeam(teammemberId: number, teamId: number): Observable<void> {
        return this.http.put<void>(`${this.apiServerUrl}/teammember/addteammembertoteam/${teammemberId}/${teamId}`, '');
      }
      
}