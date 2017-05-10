import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Task } from './task';

@Injectable()
export class TodoService {

  tasks: Task[] = [
    { id: 0, title: "Task 1", todos: [
        { id: 0, title: "Take the trash", complete: false},
        { id: 1, title: "Clean the house", complete: false},
        { id: 2, title: "Go market", complete: false},
        { id: 3, title: "Take out the trash", complete: true}, 
      ], numTodos: 3},

    { id: 1, title: "Task 3", todos: [
        { id: 0, title: "Buy break", complete: false },
        { id: 1, title: "Clean house", complete: true },
      ], numTodos: 1}
  ]

  lastTaskId: number = this.tasks.length - 1;
  lastTodoId: number;
  selectedTaskId: number;
  

  constructor() { }

  addTask(task: Task): TodoService {
    if(!task.id) {
      task.id = ++this.lastTaskId;
    }

    this.tasks.push(task);
    return this;
  }

  selectTask(id: number) {
    this.selectedTaskId = id;
    this.lastTodoId = this.tasks[this.selectedTaskId].todos.length - 1;
  }

  getAllTasks(): Task[]{
    console.log(this.tasks);
    return this.tasks;
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoService {
    if (!todo.id) {
      todo.id = ++this.lastTodoId;
    }
    this.tasks[this.selectedTaskId].todos.push(todo);
    console.log(this.tasks);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoService {
    this.tasks[this.selectedTaskId].todos = this.tasks[this.selectedTaskId].todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.tasks[this.selectedTaskId].todos
      .filter(todo => todo.id === id)
      .pop();
  }

  getAllTodos(): Todo[] {
    return this.tasks[this.selectedTaskId].todos;
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
