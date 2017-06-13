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
  MdButtonModule,
  MdInputModule,
  MaterialModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { ListsComponent } from './components/lists/lists.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './services/auth.service';

import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { environment } from "../environments/environment";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ListsComponent,
    ProfileComponent,
    ToolbarComponent,
    HomeComponent
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
    MdButtonModule,
    MdInputModule,
    SharedModule,
    MaterialModule,
    AuthModule
  ],
  providers: [
    // {provide: APP_BASE_HREF, useValue: environment.app_base_href },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Angular2TokenService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
