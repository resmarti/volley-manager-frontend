import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { RouterModule, Routes } from '@angular/router'
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppComponent } from './app.component';

import { TeamsComponent } from './teams/teams.component';
import { TeammembersComponent } from './teammembers/teammembers.component';
import { EventsComponent } from './events/events.component';

import { AddTeamToEventComponent } from './forms/add-team-to-event/add-team-to-event.component';
import { AddTeammemberToEventComponent } from './forms/add-teammember-to-event/add-teammember-to-event.component';
import { EditEventComponent } from './forms/edit-event/edit-event.component';
import { AddEventComponent } from './forms/add-event/add-event.component';

import { AddTeammemberToTeamComponent } from './forms/add-teammember-to-team/add-teammember-to-team.component';
import { AddTeamComponent } from './forms/add-team/add-team.component';
import { EditTeamComponent } from './forms/edit-team/edit-team.component';

import { AddTeammemberComponent } from './forms/add-teammember/add-teammember.component';
import { EditTeammemberComponent } from './forms/edit-teammember/edit-teammember.component';
import { AddContactPersonToTeammemberComponent } from './forms/add-contact-person-to-teammember/add-contact-person-to-teammember.component';
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
    EditContactPersonComponent,
    EditEventComponent,
    AddEventComponent,
    AddTeamToEventComponent,
    AddTeammemberToEventComponent,
    AddTeammemberToTeamComponent,
    AddTeamComponent,
    AddTeammemberComponent,
    EditTeamComponent,
    EditTeammemberComponent,
    ConfirmModalComponent
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
