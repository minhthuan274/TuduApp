import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Angular2TokenService } from 'angular2-token';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SearchService {

  private baseUrl = environment.api_url;

  private headers = new Headers({
      'Content-Type': 'application/json'
    });

  constructor(
    private http: Http,
    private authTokenSerivce: Angular2TokenService
    ) { }



  search(query: string): Promise<any> {
    let params: string = [
      `user_id=${this.authTokenSerivce.currentUserData.id}`,
      `query=${query}`
    ].join("&");

    const url = `${this.baseUrl}searchs.json?${params}`;
    return this.http 
               .get(url)
               .toPromise()
               .then(res => {
                 console.log(res.json());
                 return res.json();
               })
               .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
