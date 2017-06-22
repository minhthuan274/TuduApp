import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

import { ErrorLabelComponent } from '../../shared/error-label.component';

import { AuthService } from '../../../services/auth.service';

import { MyValidations } from '../MyValidations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { 
    this.signUpForm = fb.group({
      email: ['', Validators.compose([
          Validators.required
      ])],
      password: ['', 
        Validators.compose([
          Validators.required, 
          Validators.minLength(6),
          MyValidations.cannotContainSpace
        ])
      ],
      passwordConfirmation: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  submit() {
    this.toggleLoading();
    this.authService.signUp(this.signUpUser)
        .subscribe(
          this.authService.redirectAfterLogin.bind(this.authService),
          this.afterFailedLogin.bind(this));
  }

  afterFailedLogin(errors: any) {
    this.toggleLoading();
    let parsed_errors = JSON.parse(errors._body).errors;
    for (let attribute in this.signUpForm.controls) {
      if (parsed_errors[attribute]) {
        this.signUpForm.controls[attribute].setErrors(parsed_errors[attribute]);
      }
    }
    this.signUpForm.setErrors(parsed_errors);
  }

  private toggleLoading() {
    this.loading = !this.loading;
  }

}
