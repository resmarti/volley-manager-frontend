import { Component, OnInit } from '@angular/core';
import { Teammember } from '../interfaces/teammember';
import { TeammemberService } from '../services/teammember.service';
import { HttpErrorResponse } from '@angular/common/http';


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
  public alert: any | undefined;
  public alertType: any | undefined;
  public searchLength: number;

  constructor(private teammemberService: TeammemberService) {
    this.teammembers = [];
    this.fallbackTeammembers =[];
    this.searchLength = 0;
   }

  ngOnInit(): void {
    this.getTeammembers();
    console.log(this.alert);
  }

  public getTeammembers(): void {
    this.teammemberService.getTeammembers().subscribe(
      (response: Teammember[]) => {
        this.teammembers = response;
        this.fallbackTeammembers = this.teammembers;
        console.log(this.teammembers);
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
      if (teammember.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || teammember.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
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
    if (results.length ===0) {
      this.alert="Die Suche hat keine Übereinstimmung gefunden!"
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
    container?.appendChild(button);
    button.click();
  }

}
