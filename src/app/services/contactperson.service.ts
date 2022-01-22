import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ContactPerson } from "../interfaces/contacperson";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ContactPersonService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient) { }

    public getContactPersons(): Observable<ContactPerson[]> {
      return this.http.get<ContactPerson[]>(`${this.apiServerUrl}/contactperson/all`);
    }

    public updateContactPerson(contactPerson: ContactPerson): Observable<ContactPerson> {
      return this.http.put<ContactPerson>(`${this.apiServerUrl}/contactperson/update`, contactPerson);
    }

    public addExistingContactPersonToTeammember(contactPersonId: number, teammemberId: number): Observable<void> {
      return this.http.put<void>(`${this.apiServerUrl}/contactperson/addexistingtoteammember/${contactPersonId}/${teammemberId}`, '');
    }

    public addNewContactPersonToTeammember(contactPerson: ContactPerson, teammemberId: number): Observable<ContactPerson> {
      return this.http.post<ContactPerson>(`${this.apiServerUrl}/contactperson/addnewtoteammember/${teammemberId}`, contactPerson);
    }

    public removeContactPersonFromTeammember(contactPersonId: number,teammemberId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/contactperson/remove/${contactPersonId}/${teammemberId}`);
    }

}