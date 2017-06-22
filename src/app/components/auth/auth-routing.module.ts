import { NgModule }       from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { LoggedInGuard } from '../../services/guards/logged-in-guards.service';
import { LoggedOutGuard } from '../../services/guards/logged-out-guards.service';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'login', redirectTo: 'log-in' },
  { path: 'signup', component: SignupComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivateChild: [LoggedOutGuard],
        children: routes
      }
    ])
  ],

  exports: [
    RouterModule
  ],

  providers: [
    LoggedInGuard,
    LoggedOutGuard
  ]
})

export class AuthRoutingModule {}