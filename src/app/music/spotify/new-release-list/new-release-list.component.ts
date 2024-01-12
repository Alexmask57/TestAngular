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
  numberToDisplay: number = 10;
  totalItems: number;
  currentPage: number = 1;
  totalPages: number;

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.onLoading = true;
    this.spotifyService.getNewReleaseAlbums('FR', this.numberToDisplay, 0).subscribe(res => {
      console.log(res);
      this.albums = res.albums;
      this.onLoading = false;
      this.totalItems = res.albums.total;
      this.totalPages = this.totalItems / this.numberToDisplay;
      console.log('totalpages: ' + this.totalPages)
    });
  }

  onChangePage(pageNumber: number){
    this.currentPage = pageNumber;
    this.onLoading = true;
    let offset = this.getOffSet(pageNumber);
    this.spotifyService.getNewReleaseAlbums('FR', this.numberToDisplay, offset).subscribe(res => {
      this.albums = res.albums;
      this.onLoading = false;
    });
  }

  private getOffSet(pageNumber: number){
    return this.numberToDisplay * (pageNumber - 1);
  }

}
