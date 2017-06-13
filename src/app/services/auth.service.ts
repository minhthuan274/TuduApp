import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { Response } from "@angular/http";
import { Router }   from '@angular/router';



@Injectable()
export class AuthService {
  redirectUrl: string;
  userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    public authService: Angular2TokenService,
    public router: Router
  ) {
    this.userSignedIn$.next(this.authService.userSignedIn());
  }

  logIn(email: string, password: string): Observable<Response> {
    return this.authService.signIn({ email: email,
                                     password: password })
               .map(res => {
                 this.userSignedIn$.next(true);
                 return res;
               })
  }

  signUp(signUpData:  {email:string, password:string, passwordConfirmation:string}): Observable<Response> {
    return this.authService.registerAccount(signUpData)
               .map(res => {
                 this.userSignedIn$.next(true);
                 return res;
               })
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
    this.authService.signOut()
        .subscribe((res) => {
          this.userSignedIn$.next(false);
          this.router.navigate(['/']);
        });
    
  }

  isLoggedIn(): boolean {
    return this.userSignedIn$.getValue();
  }

  redirectAfterLogin(): void {
    let redirectTo = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = undefined;
    this.router.navigate([redirectTo]);
  }
}
