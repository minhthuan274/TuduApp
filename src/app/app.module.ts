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
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdCoreModule, MdIconModule,
  MdInputModule,
  MdLineModule, MdListModule, MdMenuModule, MdOptionModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule,
  MdRippleModule, MdSelectModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdTabsModule, MdToolbarModule, MdTooltipModule
} from '@angular/material';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent }         from './app.component';
import { TaskComponent }        from './components/task/task.component';
import { ShareListComponent }   from './components/task/share_list.component';
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
import { environment }          from "../environments/environment";

import { AdminGuard }           from './services/guards/admin-guard.service'; 
import 'hammerjs';

const MATERIAL_IMPORTS = [
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdIconModule,
  MdInputModule,
  MdLineModule,
  MdListModule,
  MdMenuModule,
  MdOptionModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
];


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProfileComponent,
    ToolbarComponent,
    HomeComponent,
    ListsManagementComponent,
    ShareListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MATERIAL_IMPORTS,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    ListsModule,
    DataTablesModule.forRoot()
  ],

  exports: [
    MATERIAL_IMPORTS
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
