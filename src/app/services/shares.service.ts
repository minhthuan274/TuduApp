import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class SharesService {

  private baseUrl = environment.api_url;

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor( 
    private http: Http) { }

  getUsers(list_id: number): Observable<Response> {
    let params = [
      `list_id=${list_id}`
    ].join("&");
    let url = `${this.baseUrl}shares.json?${params}`;
    return this.http
               .get(url);
  }

  addShare(list_id: number, user_id: number): Observable<Response> {
    let params = [
      `list_id=${list_id}`,
      `user_id=${user_id}`
    ].join("&");

    let url = `${this.baseUrl}shares.json?${params}`;

    return this.http 
               .post(url, {}, { headers: this.headers });
  }

}
