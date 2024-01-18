import {Injectable} from '@angular/core';
import {exhaustMap, from, Subject, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/auth.service";
import {CredentialsService} from "../../../credentials.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

class SpotifyCredentials {
  client_id: string;
  client_secret: string;
}

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
export class SpotifyAuthorizationService {

  credentials: SpotifyCredentials | null;
  private infosToken: InfosTokenSpotify | null;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {
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
    if (!this.credentials) {
      this.router.navigate(['/music/spotify/spotify-credentials']);
    }
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
}
