import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { RouterModule, Routes } from '@angular/router'
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppComponent } from './app.component';

import { TeamsComponent } from './teams/teams.component';
import { TeammembersComponent } from './teammembers/teammembers.component';
import { EventsComponent } from './events/events.component';

import { AddTeamToEventComponent } from './forms/add-team-to-event/add-team-to-event.component';
import { AddTeammemberToEventComponent } from './forms/add-teammember-to-event/add-teammember-to-event.component';
import { EditEventComponent } from './forms/edit-event/edit-event.component';
import { DeleteEventComponent } from './forms/delete-event/delete-event.component';
import { AddEventComponent } from './forms/add-event/add-event.component';
import { RemoveTeamFromEventComponent } from './forms/remove-team-from-event/remove-team-from-event.component';
import { RemoveTeammemberFromEventComponent } from './forms/remove-teammember-from-event/remove-teammember-from-event.component';

import { DeleteTeamComponent } from './forms/delete-team/delete-team.component';
import { RemoveTeammemberFromTeamComponent } from './forms/remove-teammember-from-team/remove-teammember-from-team.component';
import { AddTeammemberToTeamComponent } from './forms/add-teammember-to-team/add-teammember-to-team.component';
import { AddTeamComponent } from './forms/add-team/add-team.component';
import { EditTeamComponent } from './forms/edit-team/edit-team.component';

import { AddTeammemberComponent } from './forms/add-teammember/add-teammember.component';
import { DeleteTeammemberComponent } from './forms/delete-teammember/delete-teammember.component';
import { EditTeammemberComponent } from './forms/edit-teammember/edit-teammember.component';
import { AddContactPersonToTeammemberComponent } from './forms/add-contact-person-to-teammember/add-contact-person-to-teammember.component';
import { RemoveContactPersonComponent } from './forms/remove-contact-person/remove-contact-person.component';
import { EditContactPersonComponent } from './forms/edit-contact-person/edit-contact-person.component';

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
    AlertComponent,
    TeamsComponent,
    TeammembersComponent,
    EventsComponent,
    AddContactPersonToTeammemberComponent,
    RemoveContactPersonComponent,
    EditContactPersonComponent,
    EditEventComponent,
    DeleteEventComponent,
    AddEventComponent,
    AddTeamToEventComponent,
    AddTeammemberToEventComponent,
    RemoveTeamFromEventComponent,
    RemoveTeammemberFromEventComponent,
    RemoveTeammemberFromTeamComponent,
    AddTeammemberToTeamComponent,
    AddTeamComponent,
    AddTeammemberComponent,
    DeleteTeamComponent,
    DeleteTeammemberComponent,
    EditTeamComponent,
    EditTeammemberComponent
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
