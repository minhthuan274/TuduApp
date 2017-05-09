import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsernameValidators } from '../usernameValidators';
import { ResetPasswordValidators } from '../resetpasswordValidators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      oldPassword: ['', 
        Validators.compose([
          Validators.required,
        ])
      ],

      newPassword: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          UsernameValidators.cannotContainSpace
        ])
      ],

      confirmPassword: ['',
        Validators.compose([
          Validators.required, 
          UsernameValidators.cannotContainSpace
        ])
      ]
    }, { validator: ResetPasswordValidators.shouldBeMatched});
   }

  ngOnInit() {
  }

  onSubmit() {
    var oldPassword = this.form.controls['oldPassword'];
    if (oldPassword.value != "1234"){
      oldPassword.setErrors({
        invalidOldPassword: true
      });
    }
    if (this.form.valid)
      alert("HEHE");
  }

}
