import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {exhaustMap, from, tap, throwError} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {CredentialsService} from "../../credentials.service";
import {Router} from "@angular/router";
import {Albums} from "./models/albums";

class InfosTokenSpotify {
  token: string | null;
  expirationDurationToken: Date | null;

  constructor(token: string, expirationDurationDate: Date) {
    this.token = token;
    this.expirationDurationToken = expirationDurationDate;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private infosToken: InfosTokenSpotify | null;
  private endpoint: string = `${environment.urlSpotifyApi}`;
  private credentials: {
    client_id: string,
    client_secret: string
  } | null;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router) {

    this.authService.currentUser.subscribe(user => {
      if (!user) {
        this.infosToken = null;
        this.credentials = null;
        localStorage.removeItem('infos_access_token_spotify');
      }
    })
  }

  getAccessToken() {
    return from(new Promise(resolve => {
      if (this.infosToken && this.infosToken.token && this.infosToken.expirationDurationToken && new Date() <= this.infosToken.expirationDurationToken) {
        resolve(this.infosToken.token);
      } else if (this.setAccessTokenFromLocalStorage()) {
        resolve(this.infosToken?.token);
      } else {
        this.setAccessTokenFromApi().subscribe(() => resolve(this.infosToken?.token));
      }
    }));
  }

  private setAccessTokenFromApi() {

    return this.credentialsService.getCredential('Spotify').pipe(exhaustMap(spotifyCredentials => {
      if (!spotifyCredentials) {
        this.credentials = null;
        throw new Error('Pas de credentials');
      } else {
        this.credentials = {
          client_id: spotifyCredentials.Credential1,
          client_secret: spotifyCredentials.Credential2
        };

        return this.httpClient.post<{ access_token: string; expires_in: number; }>(
          environment.urlTokenSpotifyApi,
          `grant_type=client_credentials&client_id=${this.credentials.client_id}&client_secret=${this.credentials.client_secret}`,
          {
            headers: new HttpHeaders(
              {
                'Content-Type': 'application/x-www-form-urlencoded'
              })
          }).pipe(
          tap(res => {
            let token = res.access_token;
            let expirationDurationToken = new Date();
            expirationDurationToken.setSeconds(new Date().getSeconds() + res.expires_in);
            this.infosToken = new InfosTokenSpotify(token, expirationDurationToken);
            localStorage.setItem('infos_access_token_spotify', JSON.stringify(this.infosToken));
          })
        );

      }
    }));


  }

  private setAccessTokenFromLocalStorage() {
    let res: InfosTokenSpotify | null = JSON.parse(localStorage.getItem('infos_access_token_spotify') || '{}');
    if (!res || !res.token || !res.expirationDurationToken || new Date() > new Date(res.expirationDurationToken)) {
      this.infosToken = null;
      return false;
    }
    this.infosToken = new InfosTokenSpotify(res.token, res.expirationDurationToken);
    return true;
  }

  getTopTracks(limit: number = 10, offset: number = 0) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return this.httpClient.get(
      `${this.endpoint}/v1/me/top/tracks`,
      {
        params: new HttpParams()
          .set('limit', limit)
          .set('offset', offset)
      }
    );
  }

  getOneTrack() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return this.httpClient.get(
      `${this.endpoint}/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V`
    );
  }

  getMe() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return this.httpClient.get(
      `${this.endpoint}/v1/me`
    );
  }

  getNewReleaseAlbums(country: string, limit: number = 15, offset: number = 0) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return this.httpClient.get<{albums: Albums}>(
      `${this.endpoint}/v1/browse/new-releases?country=${country}&limit=${limit}&offset=${offset}`
    );
  }

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
