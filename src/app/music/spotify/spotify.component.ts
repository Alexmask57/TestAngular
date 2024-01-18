import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "./services/spotify.service";
import {CredentialsService} from "../../credentials.service";
import {exhaustMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  error: string | null;
  onLoading: boolean = false;

  credentials: {
    client_id: string,
    client_secret: string
  } | null;

  constructor(
    private spotifyService: SpotifyService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.onLoading = true;
    this.credentialsService.getCredential('Spotify')
      .subscribe(spotifyCredentials => {
          if (!spotifyCredentials) {
            this.credentials = null;
            this.router.navigate(['music/spotify/spotify-credentials']);

          } else {
            this.credentials = {
              client_id: spotifyCredentials.Credential1,
              client_secret: spotifyCredentials.Credential2
            };
          }
          this.onLoading = false;
        }
      );
  }

  protected readonly localStorage = localStorage;
}
