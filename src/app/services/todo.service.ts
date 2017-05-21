import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Task } from './task';
import { Todo } from './todo';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class TodoService {
  private tasksUrl = 'app/tasks';

  constructor(
    private http: Http
  ) { }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
               .toPromise()
               .then(response => {
                 return response.json().data as Task[];
               })
               .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    return this.getTasks()
               .then(tasks => tasks.find(task => task.id === id));
  }

  updateTask(task: Task): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.tasksUrl}/${task.id}`;

    return this.http
               .put(url, JSON.stringify(task), { headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
