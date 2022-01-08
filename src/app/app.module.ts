import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModalComponent } from 'src/shared/alert-modal/alert-modal.component';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';

import { EditPersonFormComponent } from './forms/editperson-form/editperson-form.component';
import { AddPersonFormComponent } from './forms/addperson-form/addperson-form.component';
import { DeletePersonFormComponent } from './forms/deleteperson-form/deleteperson-form.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamMembersComponent } from './team-members/team-members.component';

const routes: Routes = [
  {path: 'teams', component: TeamsComponent},
  {path: 'teammembers', component: TeamMembersComponent},
  {path: '', redirectTo: '/teammembers', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent,
    AlertComponent,
    AddPersonFormComponent,
    EditPersonFormComponent,
    DeletePersonFormComponent,
    TeamsComponent,
    TeamMembersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
