import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdProgressBarModule,
  MdToolbarModule,
  MdButtonModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TodoComponent } from './components/todo/todo.component';
import { ProfileComponent } from './components/profile/profile.component';

import { Angular2TokenService } from 'angular2-token';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TodoComponent,
    ProfileComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MdProgressBarModule,
    MdToolbarModule,
    MdButtonModule
  ],
  providers: [
    // {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
