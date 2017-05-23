import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Task } from '../models/task';
import { Todo } from '../models/todo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

  private tasksUrl = 'http://localhost:3000/';

  private headers = new Headers({
      'Content-Type': 'application/json'
    });


  constructor(
    private http: Http
  ) { }

  getTasks(): Promise<Array<Task>> {
    let indexTaskUrl = this.tasksUrl + "tasks.json";
    console.log("get All task");
    return this.http
               .get(indexTaskUrl)
               .toPromise()
               .then((response) => {
                 console.log(response.json());
                 return response.json().tasks as Task[];
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
    const url = this.tasksUrl + "tasks/" + task.id;
    return this.http
               .patch(url, JSON.stringify(task), { headers: headers })
               .toPromise()
               .then((res) => {
                 console.log(res);
                 return task;
                })
               .catch(this.handleError);
  }

  addTask(newTask: Task): Promise<void> {
    let addTaskUrl = this.tasksUrl + 'tasks';
    return this.http
               .post(addTaskUrl, JSON.stringify(newTask), { headers: this.headers } )
               .toPromise()
               .then(res => {
                 res.json();
                 console.log(res);
               })
               .catch(this.handleError);
  }

  deleteTask(task: Task): Promise<Response> {
    let deleteTaskUrl = this.tasksUrl + "tasks/" + task.id;
    return this.http
               .delete(deleteTaskUrl, { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
