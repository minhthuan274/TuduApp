import { Component, OnInit, HostBinding } from '@angular/core';
import { Http, Response }    from '@angular/http';
import { Subject }           from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

class List { 
  title: string;
  user_email: string;
  todo_count: number;
  done_count: number;
}

@Component({
  selector: 'app-lists-management',
  templateUrl: './lists-management.component.html',
  styleUrls: ['./lists-management.component.scss']
})
export class ListsManagementComponent implements OnInit {
  @HostBinding('attr.class') cssClass = '';
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();  
  lists: List[] = [];

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    let url = `${environment.api_url}list_management.json`;
    this.dtOptions = {
      pagingType: 'full_numbers',
    }

    this.http.get(url)
        .subscribe(res => {
          console.log(res.json());
          this.lists = res.json().lists as List[];
          this.dtTrigger.next();
        })
  }

}
