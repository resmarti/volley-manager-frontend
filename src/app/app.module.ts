import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModalComponent } from 'src/shared/alert-modal/alert-modal.component';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { RouterModule, Routes } from '@angular/router'
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppComponent } from './app.component';

import { TeamsComponent } from './teams/teams.component';
import { TeammembersComponent } from './teammembers/teammembers.component';

import { EditTeammemberFormComponent } from './forms/editteammember-form/editteammember-form.component';
import { AddTeammemberFormComponent } from './forms/addteammember-form/addteammember-form.component';
import { DeleteTeammemberFormComponent } from './forms/deleteteammember-form/deleteteammember-form.component';

import { EditTeamFormComponent } from './forms/editteam-form/editteam-form.component';
import { AddTeamFormComponent } from './forms/addteam-form/addteam-form.component';
import { DeleteTeamFormComponent } from './forms/deleteteam-form/deleteteam-form.component';

import { DeleteTeammemberFromTeamFormComponent } from './forms/deleteteammemberfromteam-form/deleteteammemberfromteam-form.component';
import { AddTeammemberToTeamFormComponent } from './forms/add-teammember-to-team-form/add-teammember-to-team-form.component';
import { AddContactPersonToTeammemberComponent } from './forms/add-contact-person-to-teammember/add-contact-person-to-teammember.component';
import { RemoveContactPersonComponent } from './forms/remove-contact-person/remove-contact-person.component';

const routes: Routes = [
  {path: 'teams', component: TeamsComponent},
  {path: 'teammembers', component: TeammembersComponent},
  {path: '', redirectTo: '/teammembers', pathMatch: 'full'}
]

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent,
    AlertComponent,
    TeamsComponent,
    TeammembersComponent,
    EditTeammemberFormComponent,
    AddTeammemberFormComponent,
    DeleteTeammemberFormComponent,
    AddTeamFormComponent,
    DeleteTeamFormComponent,
    EditTeamFormComponent,
    DeleteTeammemberFromTeamFormComponent,
    AddTeammemberToTeamFormComponent,
    AddContactPersonToTeammemberComponent,
    RemoveContactPersonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
