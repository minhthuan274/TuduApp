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

export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
      private authService: AuthService, 
      private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean{
      let url: string = state.url;

      return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    } 

    canLoad(route: Route): boolean {
      let url = `/${route}`;

      return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      }

      this.authService.redirectUrl = url;
      this.router.navigate(['/log-in']);
      return false;
    }
}