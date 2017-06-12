import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable } from "rxjs";
import { Response } from "@angular/http";
import { Router }   from '@angular/router';



@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    public authService: Angular2TokenService,
    public router: Router
  ) {}

  logIn(email: string, password: string): Observable<Response> {
    return this.authService.signIn({ email: email,
                                     password: password });
  }

  signUp(signUpData:  {email:string, password:string, passwordConfirmation:string}): Observable<Response> {
    return this.authService.registerAccount(signUpData);
  }

  getUserData() {
    return this.authService.currentUserData;
  }

  proccessOauthCallback(): void {
    this.authService.processOAuthCallback();
    this.redirectAfterLogin();
  }

  logOut(): void {
    this.redirectUrl = undefined;
    this.authService.signOut().subscribe(() => this.router.navigate(['/']));
    
  }

  isLoggedIn(): boolean {
    return this.authService.userSignedIn();
  }

  redirectAfterLogin(): void {
    let redirectTo = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = undefined;
    this.router.navigate([redirectTo]);
  }
}
