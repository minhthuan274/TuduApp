import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { List } from '../models/list';
import { Task } from '../models/task';

import { AuthService } from './auth.service';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ListService {

  private ListsUrl = environment.api_url;

  private headers = new Headers({
      'Content-Type': 'application/json'
    });


  constructor(
    private http: Http,
    private authService: AuthService,
    private authTokenSerivce: Angular2TokenService
  ) { }

  getLists(): Promise<Array<List>> {
    // console.log(this.authTokenSerivce.currentUserData);
    let params: string = [
      `user_id=3`
    ].join("&");
    let indexListUrl = `${this.ListsUrl}lists.json?${params}`;
    console.log("get All List");
    return this.http
               .get(indexListUrl)
               .toPromise()
               .then((response) => {
                 console.log(response.json());
                 return response.json().lists as List[];
               })
               .catch(this.handleError);
  }

  getList(id: number): Promise<List>{
    console.log("Get List with ", id);
    return this.getLists()
               .then(Lists => Lists.find(list => list.id === id));
  }

  updateList(list: List): Promise<Response> {
    let params: string = [
      `title=${list.title}`
    ].join("&");
    const url = `${this.ListsUrl}lists/${list.id}?${params}`;
    return this.http
               .patch(url, {}, { headers: this.headers })
               .toPromise()
               .then((res) => {
                 console.log(res);
                 return res;
                })
               .catch(this.handleError);
  }

  addList(newList: List): Promise<Response> {
    let params: string = [
      `title=${newList.title}`,
      `user_id=3`
    ].join("&");    
    const url = `${this.ListsUrl}lists?${params}`;
    return this.http
               .post(url, {}, { headers: this.headers } )
               .toPromise()
               .catch(this.handleError);
  }

  deleteList(list: List): Promise<Response> {
    let deleteListUrl = `${this.ListsUrl}lists/${list.id}`;
    return this.http
               .delete(deleteListUrl, { headers: this.headers })
               .toPromise()
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
