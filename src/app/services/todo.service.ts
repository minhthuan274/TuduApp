import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Task } from '../models/task';
import { Todo } from '../models/todo';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class TodoService {
  private todosUrl = 'http://localhost:3000/';

  private headers = new Headers({
      'Content-Type': 'application/json'
    });

  constructor(
    private http: Http
  ) { }

  getTodos(id: number): Promise<Todo[]> {
    const url = this.todosUrl + "tasks/" + id + ".json";
    return this.http.get(url)
               .toPromise()
               .then(response => {
                 console.log("Respone get todos ", response.json());
                 return response.json().todos as Todo[];
               })
               .catch(this.handleError);
  }

  addTodo(todo: Todo): Promise<Response> {
    // const url = this.todosUrl + "todos";
    const url = `${this.todosUrl}todos?title=${todo.title}&belongs_to=${todo.belongs_to}`;
    return this.http
               .post(url, {}, { headers: this.headers })
               .toPromise()
               .then(res => {
                //  console.log(JSON.parse(res.text()).id);
                 return res;
               })
               .catch(this.handleError);
  }

  toggleTodoComplete(id: number): Promise<Response> {
    const url = this.todosUrl + 'todos/' + id;
    return this.http
               .patch(url, JSON.stringify(id), { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  removeTodo(id: number): Promise<Response> {
    const url = this.todosUrl + "todos/" + id;
    return this.http 
               .delete(url, { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
