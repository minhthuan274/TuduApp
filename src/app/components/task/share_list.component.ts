import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'
import * as _ from 'lodash';

import { SharesService } from '../../services/shares.service' 
import 'rxjs/add/operator/filter';

import { List } from '../../models/list';

class User {
  id: number;
  email: string;
}

@Component({
  selector: 'app-share-list',
  templateUrl: './share_list.component.html',
  styleUrls: ['./share_list.component.scss'],
  providers: [SharesService]
})

export class ShareListComponent implements OnInit {
  @HostBinding('attr.class') cssClass = '';
  @Input() list_id: number;
  users: User[];
  loading = false;
  selectedId: number = 0;
  constructor(
    private sharesService: SharesService ) {}

  ngOnInit() {
    this.sharesService.getUsers(this.list_id)
        .subscribe(
          res => {
            this.users = res.json().users as User[];
          })
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  shareList() {
    if (this.selectedId == 0) return;
    this.toggleLoading();
    this.sharesService.addShare(this.list_id, this.selectedId)
        .subscribe(
          res => {
            this.toggleLoading(); //stop loading 
            this.users = _.filter(this.users, user => user.id != this.selectedId);
            this.selectedId = 0;
          })
  }
}