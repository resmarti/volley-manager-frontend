import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Team } from "../interfaces/team";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient) { }

    public getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${this.apiServerUrl}/team/all`);
    }

    public addTeam(team: Team): Observable<Team> {
        return this.http.post<Team>(`${this.apiServerUrl}/team/add`, team);
      }
    
      public updateTeam(team: Team): Observable<Team> {
        return this.http.put<Team>(`${this.apiServerUrl}/team/update`, team);
      }
    
      public deleteTeam(teamId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/team/delete/${teamId}`);
      }

}