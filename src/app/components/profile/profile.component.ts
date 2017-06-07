import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [Angular2TokenService]
})
export class ProfileComponent implements OnInit {

  constructor(private tokenService: Angular2TokenService) {
    this.tokenService.init({
      registerAccountPath: 'http://localhost:3000/auth'
    })
   }

  ngOnInit() {
  }

  signUp() {
    this.tokenService.registerAccount({
        email:                'example@example.org',
        password:             'secretPassword',
        passwordConfirmation: 'secretPassword'
    }).subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
  }

}
