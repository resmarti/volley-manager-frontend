import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModalComponent } from 'src/shared/alert-modal/alert-modal.component';
import { AlertComponent } from 'src/shared/alert/alert.component';

import { AppComponent } from './app.component';

import { EditPersonFormComponent } from './forms/editperson-form/editperson-form.component';
import { AddPersonFormComponent } from './forms/addperson-form/addperson-form.component';
import { DeletePersonFormComponent } from './forms/deleteperson-form/deleteperson-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent,
    AlertComponent,
    AddPersonFormComponent,
    EditPersonFormComponent,
    DeletePersonFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
