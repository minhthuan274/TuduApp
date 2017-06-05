import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'

import { Todo } from '../../models/todo';
import { Task } from '../../models/task';
import { TodoService } from '../../services/todo.service';
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
  dones: Todo[];
  todos: Todo[] = new Array<Todo>();
  isReady = false;
  taskId: number;


  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.route.params
      .subscribe(params => {
        this.taskId = +params.id;
        this.todoService.getTodos(this.taskId)
                        .then(todos => {
                          this.todos = todos;
                          console.log("Get todos ", todos);
                          this.dones = this.todos.filter(v => v.isComplete);
                          this.todos = this.todos.filter(v => !v.isComplete);                        
                          this.isReady = true;
                        })
      });
  }
  addTodo() {
    this.newTodo.isComplete = false;
    this.newTodo.belongs_to = this.taskId;
    this.todoService.addTodo(this.newTodo)
                    .then((res) => {
                      if (res.ok){
                        this.newTodo.id = JSON.parse(res.text()).id;
                        this.todos.push(this.newTodo);
                      }
                       this.newTodo = new Todo();
                    })
  }

  markAllDone(){
    this.todoService.markAllDone(this.taskId)
        .then(res => {
          if (res.ok) {
            this.todos.map(v => {
              v.isComplete = true;
              this.dones.push(v);
            });
            this.todos = [];
          }
        })
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id)
        .then(() => {
          this.dones = this.dones.filter(v => v.id !== id);
        });
  }

  toggleTodoComplete(todo: Todo) {
    this.todoService.toggleTodoComplete(todo.id) 
        .then(() => {
          todo.isComplete = true;
          this.dones.push(todo);
          this.todos = this.todos.filter(v => v.id !== todo.id);
        })
  }
}
