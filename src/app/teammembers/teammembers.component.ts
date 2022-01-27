import { Component, OnInit, Input } from '@angular/core';
import { Teammember } from '../interfaces/teammember';
import { TeammembersService } from '../services/teammembers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchTearmService } from '../services/search-service.service';
import { ContactPerson } from '../interfaces/contacperson';
import { ContactPersonsService } from 'src/app/services/contact-persons.service';
import { RefreshContactPersonsService } from 'src/app/services/refresh-contact-persons.service';


@Component({
  selector: 'app-teammembers',
  templateUrl: './teammembers.component.html',
  styleUrls: ['./teammembers.component.css']
})
export class TeammembersComponent implements OnInit {
  public teammembers: Teammember[];
  public fallbackTeammembers: Teammember[];
  public selectedTeammember: Teammember | undefined;
  public selectedContactPerson: ContactPerson | undefined;
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchTerm: string;
  public searchLength: number;
  public action: string | undefined;
  public confirmTitle: string | undefined;
  public confirmMessage: string | undefined;
  public refreshContactPersons: boolean | undefined;

  constructor(private teammembersService: TeammembersService, private contactPersonsService: ContactPersonsService, private refreshContactPersonsService: RefreshContactPersonsService, private searchTermService: SearchTearmService) {
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
    //subscribe to service for announcing a contact person refresh
    this.refreshContactPersonsService.currentRefreshContactPersons.subscribe(refreshContactPersons=> {
      this.refreshContactPersons=refreshContactPersons;
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
      this.selectedTeammember = teammember;
      button.setAttribute('data-bs-target', '#updateTeammemberModal')
    }
    else if(mode === 'delete') {
      this.selectedTeammember = teammember;
      button.setAttribute('data-bs-target', '#deleteTeammemberModal')
    }
    else if(mode === 'deleteTeammember') {
      this.action="delete"
      this.selectedTeammember=teammember;
      this.confirmTitle = "Mitglied löschen";
      this.confirmMessage = "Bist du sicher, dass du das die Mitglied " + this.selectedTeammember?.firstName + " " + this.selectedTeammember?.lastName + " löschen möchtest?"
      button.setAttribute('data-bs-target', '#confirmModal')
    }
    else if(mode === 'removeContactPersonFromTeammember') {
      this.action="removeTeammemberFromTeam";
      this.selectedTeammember=teammember;
      this.confirmTitle = "Kontaktperson entfernen";
      this.confirmMessage = "Bist du sicher, dass du " + this.selectedTeammember?.contactPerson?.firstName + " " + this.selectedTeammember?.contactPerson?.lastName + " als Kontaktperson von " + this.selectedTeammember?.firstName + " " + this.selectedTeammember?.lastName + " entfernen möchtest?"
      button.setAttribute('data-bs-target', '#confirmModal')
    }
    else if(mode === 'addContactPerson') {
      this.selectedTeammember = teammember;
      button.setAttribute('data-bs-target', '#addContactPersonToTeammemberModal')
    }
    else if(mode === 'editContactPerson') {
      this.selectedContactPerson = teammember?.contactPerson;
      button.setAttribute('data-bs-target', '#updateContactPersonModal')
    }
    container?.appendChild(button);
    button.click();
  }

  //method to be called after confirmation in confirm modal
  public confirmedAction(): void {
    if(this.action=="delete") {
      this.onDeleteTeammember();
    }
    else if (this.action=="removeTeammemberFromTeam") {
      this.onRemoveContactPerson();
    }
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

  //method to be called for deleting a teammember after confirmation
  public onDeleteTeammember(): void {
    this.teammembersService.deleteTeammember(this.selectedTeammember!.id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getTeammembers();
        /*if (this.closeDeleteModal) {
          this.closeDeleteModal.nativeElement.click();
        }*/
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to be called for removing a contact person from teammember after confirmation
  public onRemoveContactPerson(): void {
    this.contactPersonsService.removeContactPersonFromTeammember(this.selectedTeammember!.contactPerson!.id, this.selectedTeammember!.id).subscribe({
      next: () => {
        this.getTeammembers();
        this.refreshContactPersons=true;
        //ask for a refresh of existing contact persons
        this.contactPersonsRefresh(this.refreshContactPersons);
        /*if (this.closeRemoveModal) {
          this.closeRemoveModal.nativeElement.click();
        }*/
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  //method to ask for a refresh of existing contact persons in sibling component
  public contactPersonsRefresh(refreshContactPerson: boolean) {
    this.refreshContactPersonsService.announceRefreshContactPersons(refreshContactPerson);
  }

}
