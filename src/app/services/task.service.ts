import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Task } from '../models/task';
import { List } from '../models/list';

import {Observable} from 'rxjs/Rx';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class TaskService {
  private TasksUrl = environment.api_url;

  private headers = new Headers({
      'Content-Type': 'application/json'
    });

  constructor(
    private http: Http
  ) { }

  getTasks(id: number): Promise<Task[]> {
    let url = `${this.TasksUrl}lists/${id}.json`;
    return this.http.get(url)
               .toPromise()
               .then(response => {
                 console.log("Respone get Tasks ", response.json());
                 return response.json().tasks as Task[];
               })
               .catch(this.handleError);
  }

  addTask(task: Task): Promise<Response> {
    let params: string = [
      `title=${task.title}`,
      `list_id=${task.list_id}`
    ].join("&");
    const url = `${this.TasksUrl}tasks?${params}`;
    return this.http
               .post(url, {}, { headers: this.headers })
               .toPromise()
               .then(res => {
                //  console.log(JSON.parse(res.text()).id);
                 return res;
               })
               .catch(this.handleError);
  }

  markAllDone(task_id: number): Promise<Response> {
    let params: string = [
      `task_id=${task_id}`
    ].join("&");

    const url = `${this.TasksUrl}mark_all_done?${params}`;
    return this.http
               .post(url, {}, { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  toggleTaskComplete(id: number): Promise<Response> {
    let url = `${this.TasksUrl}tasks/${id}`;
    return this.http
               .patch(url, {}, { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  removeTask(id: number): Promise<Response> {
    let url = `${this.TasksUrl}tasks/${id}`;
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
