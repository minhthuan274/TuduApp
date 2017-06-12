import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, CanDeactivate } from '@angular/router';

import { List } from "../../models/list";
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  providers: [ListService]
})
export class ListsComponent implements OnInit {

  newList: List = new List();
  form: FormGroup;
  lists: List[];
  error: any;
  listEditing = -1;
  loading = true;

  constructor(
    private router: Router,
    private listService: ListService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      newListTitle: ['',
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.listService
        .getLists()
        .then(lists => {
          this.toogleLoading();
          this.lists = lists;
          console.log(this.lists);
        })
        .catch(error => this.error = error);
  }

  deleteList(list: List, event: Event) {
    event.stopPropagation();
    this.listService
        .deleteList(list)
        .then(() => {
          this.lists = this.lists.filter(v => v.id !== list.id);
        })
        .catch(error => this.error = error);
  }
  addList() {
    console.log("Add list");
    this.toogleLoading();
    this.listService
        .addList(this.newList)
        .then((res) => {
          this.toogleLoading();
          this.newList.id = JSON.parse(res.text()).id;
          console.log(this.lists);
          this.lists.push(this.newList);
          this.newList = new List();
        })
  }

  changeToEdit(list: List, event: any) {
    event.stopPropagation();
    this.listEditing = list.id;
  }

  editList(text: string, list: List, event: any) {
    event.stopPropagation();
    list.title = text;
    this.listService
        .updateList(list)
        .then(() => {
          this.lists.find(t => t.id === list.id).title = text;
          this.revertEdit();
        })
  }

  revertEdit() {
    this.listEditing = -1;
  }

  goTodo(id: number) {
    this.router.navigate(['/lists', id]);
  }

  toogleLoading() {
    this.loading = !this.loading;
  }


}
