import {
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad
} from '@angular/router';

import { Injectable } from '@angular/core';

import { AuthService } from '../auth.service';


@Injectable()

export class LoggedOutGuard implements CanActivateChild {
  constructor(
    private authService: AuthService, 
    private router: Router){}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) { return true; }

    this.router.navigate(['/']);
    return false;
  }
}