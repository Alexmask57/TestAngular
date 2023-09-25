import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserAuth} from "../models/user-auth.model";
import {environment} from "../environments/environment";
import {catchError, map, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = `${environment.urlAuthApi}`;
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept', 'text/plain');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {

  }

  login(email:string, password:string ) {
    return this.http
      .post<any>(`${this.endpoint}/Auth/login`, {email, password}, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        tap(res => localStorage.setItem('access_token', res.Token))
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['home']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }

}
