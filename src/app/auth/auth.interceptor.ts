import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HttpHeaders
} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!request.url.includes(environment.urlAuthApi))
          return next.handle(request);
        if (!user || !user.token) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          headers: new HttpHeaders({Authorization: `Bearer ${user.token}`})
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
