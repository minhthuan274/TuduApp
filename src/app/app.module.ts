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
  MdCardModule
} from '@angular/material';

import { AppComponent }         from './app.component';
import { TaskComponent }        from './components/task/task.component';
import { ProfileComponent }     from './components/profile/profile.component';
import { ToolbarComponent }     from './components/toolbar/toolbar.component';
import { HomeComponent }        from './components/home/home.component';
import { ListsManagementComponent } from './components/lists-management/lists-management.component';

import { Angular2TokenService } from 'angular2-token';
import { AuthService }          from './services/auth.service';
import { SearchService }        from './services/search.service';

import { SharedModule }         from './components/shared/shared.module';
import { AuthModule }           from './components/auth/auth.module';
import { ListsModule }          from './components/task_lists/lists.module';
import { DataTablesModule }     from 'angular-datatables';
import { environment }          from "../environments/environment";

import { AdminGuard }           from './services/guards/admin-guard.service'; 


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProfileComponent,
    ToolbarComponent,
    HomeComponent,
    ListsManagementComponent,
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
    MdCardModule,
    MdInputModule,
    SharedModule,
    AuthModule,
    ListsModule,
    DataTablesModule
  ],
  providers: [
    // {provide: APP_BASE_HREF, useValue: environment.app_base_href },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Angular2TokenService,
    AuthService,
    SearchService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
