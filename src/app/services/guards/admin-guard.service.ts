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
export class AdminGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean{
      if (this.authService.currentUserAdmin) { return true; }

      this.router.navigate(['/home']);
      return false;
    }
}
