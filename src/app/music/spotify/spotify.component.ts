import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "./spotify.service";

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  error: string | null;
  data: any;

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
  }
}
