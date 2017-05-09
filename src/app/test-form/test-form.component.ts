import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './signup.interface';

@Component({
  selector: 'app-test-form',
  template: `
    <form novalidate (ngSubmit)="onSubmit(user)" [formGroup]="user">
      <label>
        <span>Full name</span>
        <input type="text" placeholder="Your full name" formControlName="name">
      </label>
      <div class="error" *ngIf="user.get('name').hasError('required') && user.get('name').touched">
        Name is required
      </div>
      <div class="error" *ngIf="user.get('name').hasError('minlength') && user.get('name').touched">
        Minimum of 2 characters
      </div>
      <div formGroupName="account">
        <label>
          <span>Email address</span>
          <input type="email" placeholder="Your email address" formControlName="email">
        </label>
        <div
          class="error"
          *ngIf="user.get('account').get('email').hasError('required') && user.get('account').get('email').touched">
          Email is required
        </div>
        <label>
          <span>Confirm address</span>
          <input type="email" placeholder="Confirm your email address" formControlName="confirm">
        </label>
        <div
          class="error"
          *ngIf="user.get('account').get('confirm').hasError('required') && user.get('account').get('confirm').touched">
          Confirming email is required
        </div>
      </div>
      <button type="submit" [disabled]="user.invalid">Sign up</button>
    </form>
  `
})
export class TestFormComponent implements OnInit {
  user: FormGroup;
  constructor() {}
  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      account: new FormGroup({
        email: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required)
      })
    });
  }
  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
  }
}
