import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {catchError, exhaustMap, Observable, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {SpotifyService} from "./services/spotify.service";
import {CredentialsService} from "../../credentials.service";

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {

  constructor(
    private spotifyService: SpotifyService,
    private credentialsService: CredentialsService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes(environment.urlSpotifyApi)) {
      return this.spotifyService.getAccessToken().pipe(
        catchError(this.spotifyService.handleError),
        exhaustMap(token => {
        if (!token)
          return next.handle(request);
        const modifiedReq = request.clone({
          headers: new HttpHeaders({Authorization: `Bearer ${token}`})
        });
        return next.handle(modifiedReq).pipe(catchError(this.spotifyService.handleError));
      }));
    } else {
      return next.handle(request);
    }
  }
}
