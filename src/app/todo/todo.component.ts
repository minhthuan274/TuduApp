import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'

import { Todo } from '../todo';
import { Task } from '../task';
import { TodoService } from '../todo.service';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  newTodo: Todo = new Todo();
  tasks: Task[];
  task : Task = new Task();
  dones: Todo[];
  todos: Todo[];
  isReady = false;


  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.route.params
      .subscribe(params => {
        this.todoService.getTask(+params.id)
                        .then(task => {
                          this.task = task;
                          this.dones = task.todos.filter(v => v.complete);
                          this.todos = task.todos.filter(v => !v.complete);                        
                          this.isReady = true;
                        })
      });
  }
  addTodo() {
    this.newTodo.id = this.task.todos.length;
    this.task.todos.push(this.newTodo);
    this.todoService.updateTask(this.task);
    this.getTask();
    this.newTodo = new Todo();
  }

  markAllDone(){
    this.task.todos.filter(v => !v.complete)
        .map(v => v.complete = !v.complete);
    this.todoService.updateTask(this.task);
    this.getTask();
  }

  removeTodo(id: number) {
    this.task.todos = this.task.todos.filter(v => v.id !== id);
    this.todoService.updateTask(this.task);
    this.getTask();
  }

  toggleTodoComplete(todo) {
    this.task.todos.filter(v => v.id === todo.id)
        .map(v => v.complete = !v.complete);
    this.todoService.updateTask(this.task);
    this.getTask();
  }
}
