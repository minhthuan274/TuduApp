import { Component, OnInit } from '@angular/core';

import { ListsComponent } from './lists/lists.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task_lists.component.html'
})

export class TaskListsComponent implements OnInit{
  isSearching = false;

  constructor() {}

  ngOnInit() {}

  toogleSearching(status: boolean) {
    this.isSearching = status;
  }

}