import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  newTodo: Todo = new Todo();


  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => this.todoService.selectTask(+params.id));
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  markAllDone(){
    this.todoService.getAllTodos()
                    .filter(v => !v.complete)
                    .map(v => this.toggleTodoComplete(v));
  }

  get todos() {
    return this.todoService.getAllTodos()
                           .filter(v => !v.complete);
  }

  get dones() {
    return this.todoService.getAllTodos()
                           .filter(v => v.complete);
  }

}
