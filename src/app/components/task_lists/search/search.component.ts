import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SearchService } from '../../../services/search.service';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';

import { Subject, Observable, BehaviorSubject } from "rxjs";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'col-md-5';
  @Output() searching: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  results: any;
  header: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private router: Router ) { 
    this.form = fb.group({
      search: []
    })
  }

  ngOnInit() {
    var search = this.form.get('search');
    search.valueChanges
          .do(() => this.loading$.next(true))
          .debounceTime(450)
          .subscribe((query: string) => {
            this.searchService.search(query)
                .then(res => {
                    this.loading$.next(false);
                    console.log(res);
                    this.header = res.found;
                    this.results = res.searchs; 
                })
          })
  }

  goToTask(id: number) {
    this.router.navigate(['/lists', id]);
  }

}
