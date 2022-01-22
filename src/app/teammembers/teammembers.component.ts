import { Component, OnInit, Input } from '@angular/core';
import { Teammember } from '../interfaces/teammember';
import { TeammemberService } from '../services/teammember.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchTearmService } from '../services/search-service.service';


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
  public searchTerm: string | undefined;
  public searchLength: number;

  constructor(private teammemberService: TeammemberService, private searchTermService: SearchTearmService) {
    this.teammembers = [];
    this.fallbackTeammembers =[];
    this.searchLength = 0;
   }

  ngOnInit(): void {
    this.getTeammembers();
    this.searchTermService.currentSearchTerm.subscribe(searchTerm=> {
      this.searchTerm=searchTerm;
      this.searchTeammember(this.searchTerm);
    })
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


  public searchTeammember(key: string): void {
    console.log(key);
    if (this.searchLength>key.length) {
      this.teammembers=this.fallbackTeammembers;
    }
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
    if (results.length === 0 || !key) {
      this.getTeammembers();
    }; 
    if (results.length ===0 && key.length>0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden! Es werden alle Mitglieder angezeigt."
      this.alertType="warning"
    }
    else {
      this.alert=null;
    }
    this.searchLength = key.length;
    console.log(this.searchLength)
  }

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
      //button.setAttribute('data-bs-target', '#deleteTeammemberModal')
      button.setAttribute('data-bs-target', '#removeContactPersonModal')
    }
    container?.appendChild(button);
    button.click();
  }

  public returnOnlyString(mobile: string | undefined): string {
    if (typeof mobile === 'string') {
      return mobile;
    }
    return "";
  }

  public validPhonenumber(mobile: string | undefined): boolean {
    return RegExp("^[0-9]{11}").test(this.returnOnlyString(mobile))
  }

}
