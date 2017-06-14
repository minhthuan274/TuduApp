import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

import { MyValidations } from '../MyValidations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([
          Validators.required, 
          MyValidations.cannotContainSpace
        ])]
    })
  }

  submit(value: any) {
    this.toggleLoading();
    this.authService.logIn(value.email, value.password).subscribe(
      this.authService.redirectAfterLogin.bind(this.authService),
      this.afterFailedLogin.bind(this)
    );
  }

  afterFailedLogin(errors: any) {
    this.toggleLoading();
    let parsed_errors = JSON.parse(errors._body).errors;
    for (let attribute in this.loginForm.controls) {
      if (parsed_errors[attribute]) {
        this.loginForm.controls[attribute].setErrors(parsed_errors[attribute]);
      }
    }
    this.loginForm.setErrors(parsed_errors);
  }

  private toggleLoading() {
    this.loading = !this.loading;
  }

}
