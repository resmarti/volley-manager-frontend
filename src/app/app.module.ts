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
import { EditContactPersonComponent } from './forms/edit-contact-person/edit-contact-person.component';
import { EventsComponent } from './events/events.component';
import { EditEventComponent } from './forms/edit-event/edit-event.component';
import { DeleteEventComponent } from './forms/delete-event/delete-event.component';
import { AddEventComponent } from './forms/add-event/add-event.component';
import { AddTeamToEventComponent } from './forms/add-team-to-event/add-team-to-event.component';
import { AddTeammemberToEventComponent } from './forms/add-teammember-to-event/add-teammember-to-event.component';
import { RemoveTeamFromEventComponent } from './forms/remove-team-from-event/remove-team-from-event.component';
import { RemoveTeammemberFromEventComponent } from './forms/remove-teammember-from-event/remove-teammember-from-event.component';

const routes: Routes = [
  {path: 'events', component: EventsComponent},
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
    RemoveContactPersonComponent,
    EditContactPersonComponent,
    EventsComponent,
    EditEventComponent,
    DeleteEventComponent,
    AddEventComponent,
    AddTeamToEventComponent,
    AddTeammemberToEventComponent,
    RemoveTeamFromEventComponent,
    RemoveTeammemberFromEventComponent
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
