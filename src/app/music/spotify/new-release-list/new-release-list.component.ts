import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../spotify.service";
import {Albums} from "../models/albums";

@Component({
  selector: 'app-new-release-list',
  templateUrl: './new-release-list.component.html',
  styleUrls: ['./new-release-list.component.css']
})
export class NewReleaseListComponent implements OnInit {

  albums: Albums;
  onLoading: boolean = false;

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.onLoading = true;
    this.spotifyService.getNewReleaseAlbums('FR').subscribe(res => {
      console.log(res);
      this.albums = res.albums;
      this.onLoading = false;
    });
  }

}
