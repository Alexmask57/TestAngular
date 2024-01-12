import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserAuth} from "../../models/user-auth.model";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, exhaustMap, map, Observable, Subject, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {LoginResponse} from "../../models/login_response.model";
import {SigninResponse} from "../../models/signin_response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any;
  private endpoint: string = `${environment.urlAuthApi}`;
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept', 'text/plain');
  currentUser = new BehaviorSubject<UserAuth | null>(null);

  constructor(private http: HttpClient, public router: Router) {

  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.endpoint}/Auth/login`, {email, password}, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        tap(res => {
          let user = new UserAuth(res.Username, res.Email, res.Token, new Date(res.TokenExpirationDate));
          localStorage.setItem('userData', JSON.stringify(user));
          this.currentUser.next(user);
          this.autoLogout(user.tokenExpirationDate.getTime() - new Date().getTime())
        })
      );
  }

  signIn(email: string, username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<SigninResponse>(`${this.endpoint}/Auth/register`, {email, username, password}, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        exhaustMap(res => {
          return this.login(email, password);
        })
      );
  }

  autoLogin() {
    const user: {
      username: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!user)
      return;

    const loadedUser = new UserAuth(
      user.username,
      user.email,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token){
      this.currentUser.next(loadedUser);
      let expirationDuration = loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    localStorage.removeItem('userData');
    this.currentUser.next(null);
    this.router.navigate(['/']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
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
