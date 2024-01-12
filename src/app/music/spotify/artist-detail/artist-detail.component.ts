import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../spotify.service";
import {Artist} from "../models/artist";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  artist: Artist;
  onLoading: boolean = false;

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.onLoading= true;
    let artistId: string = this.route.snapshot.params['id'];
    this.spotifyService.getArtist(artistId).subscribe(res => {
      this.artist = res;
      console.log(this.artist);
      this.onLoading = false;
    })
  }

}
