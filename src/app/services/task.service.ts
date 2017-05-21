import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Task } from './task';
import { Todo } from './todo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

  private tasksUrl = 'app/tasks';

  private headers = new Headers({
      'Content-Type': 'application/json'
    });


  constructor(
    private http: Http
  ) { }

  getTasks(): Promise<Array<Task>> {
    console.log("get All task");
    return this.http
               .get(this.tasksUrl)
               .toPromise()
               .then((response) => {
                 console.log(response.json());
                 return response.json().data as Task[];
               })
               .catch(this.handleError);
  }

  getTask(id: number): Promise<Task>{
    console.log("Get task with ", id);
    return this.getTasks()
               .then(tasks => tasks.find(task => task.id === id));
  }

  updateTask(task: Task): Promise<Task> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http
               .put(url, JSON.stringify(task), { headers: headers })
               .toPromise()
               .then(() => task)
               .catch(this.handleError);
  }

  addTask(newTask: Task): Promise<void> {
    newTask.todos = new Array<Todo>();
    return this.http
               .post(this.tasksUrl, JSON.stringify(newTask), { headers: this.headers } )
               .toPromise()
               .then(res => {
                 res.json().data;
                 console.log(res);
               })
               .catch(this.handleError);
  }

  deleteTask(task: Task): Promise<Response> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
               .delete(url, { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
