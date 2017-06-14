import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {     
  MdProgressBarModule,
  MdProgressSpinnerModule
 }  from '@angular/material';

import { TaskListsComponent } from './task_lists.component';
import { ListsComponent } from './lists/lists.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdProgressBarModule,
    MdProgressSpinnerModule

  ],
  declarations: [
    TaskListsComponent,
    ListsComponent,
    SearchComponent
  ]
})

export class ListsModule {}