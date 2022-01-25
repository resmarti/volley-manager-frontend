import { Component, OnInit, Input } from '@angular/core';
import { Teammember } from '../interfaces/teammember';
import { TeammembersService } from '../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchTearmService } from '../services/search-service.service';
import { ContactPerson } from '../interfaces/contacperson';

@Component({
  selector: 'app-teammembers',
  templateUrl: './teammembers.component.html',
  styleUrls: ['./teammembers.component.css']
})
export class TeammembersComponent implements OnInit {
  public teammembers: Teammember[];
  public fallbackTeammembers: Teammember[];
  public editTeammember: Teammember | undefined;
  public deleteTeammember: Teammember | undefined;
  public removeContactPerson: Teammember | undefined;
  public addToTeammember: Teammember | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string;
  public searchLength: number;
  public editContactPerson: ContactPerson | undefined;

  constructor(private teammembersService: TeammembersService, private searchTermService: SearchTearmService) {
    this.teammembers = [];
    this.fallbackTeammembers =[];
    this.searchTerm = "";
    this.searchLength = 0;
   }

  ngOnInit(): void {
    //get team members from the api
    this.getTeammembers();
    //subscribe to search term service to get search terms from parent
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> {
      this.searchTerm=searchTerm;
      this.searchTeammember(this.searchTerm);
    })
  }

  //method to get team members from the api
  public getTeammembers(): void {
    this.teammembersService.getTeammembers().subscribe({
      next: (response: Teammember[]) => {
        this.teammembers = response;
        this.fallbackTeammembers = this.teammembers;
      },
      error: (error: HttpErrorResponse) => {
        this.alert=error.message;
        this.alertType="danger";
      }
    });
  }

  //method to search team members
  public searchTeammember(key: string): void {
    //reset team members if characters are removed
    if (this.searchLength>key.length) {
      this.teammembers=this.fallbackTeammembers;
    }
    //actual search within team members
    const results: Teammember[] = [];
    for (const teammember of this.teammembers) {
      if ((teammember.firstName + " " + teammember.lastName).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.street.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.mobile.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(teammember);
      }
    }
    this.teammembers = results;
    //reset result if nothing is found
    if (results.length === 0 || !key) {
      this.teammembers = this.fallbackTeammembers;
    };
    //show alert if nothing is found and there is a search term
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden! Es werden alle Mitglieder angezeigt."
      this.alertType="warning"
    }
    //else remove the alert
    else {
      this.alert=null;
    }
    //set search term length to detect character removal
    this.searchLength = key.length;
  }

  //method to open various modals
  public onOpenModal(mode: string, teammember?: Teammember): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addTeammemberModal')
    }
    else if(mode === 'edit') {
      this.editTeammember = teammember;
      button.setAttribute('data-bs-target', '#updateTeammemberModal')
    }
    else if(mode === 'delete') {
      this.deleteTeammember = teammember;
      button.setAttribute('data-bs-target', '#deleteTeammemberModal')
    }
    else if(mode === 'addContactPerson') {
      this.addToTeammember = teammember;
      button.setAttribute('data-bs-target', '#addContactPersonToTeammemberModal')
    }
    else if(mode === 'removeContactPerson') {
      this.removeContactPerson = teammember;
      button.setAttribute('data-bs-target', '#removeContactPersonModal')
    }
    else if(mode === 'editContactPerson') {
      this.editContactPerson = teammember?.contactPerson;
      button.setAttribute('data-bs-target', '#updateContactPersonModal')
    }
    container?.appendChild(button);
    button.click();
  }

  //method to filter missing mobile numbers (needed for masking)
  public returnOnlyString(mobile: string | undefined): string {
    if (typeof mobile === 'string') {
      return mobile;
    }
    return "";
  }
  
  //method to filter only valid mobile nummbers (also neede for masking)
  public validPhonenumber(mobile: string | undefined): boolean {
    return RegExp("^[0-9]{11}").test(this.returnOnlyString(mobile))
  }

}
