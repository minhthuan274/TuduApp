import { Component, OnInit } from '@angular/core';
import { Route, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {



  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // isLoggedIn(): boolean {
    
  // }

  // isLoggedOut(): boolean {
  
  // }

}
