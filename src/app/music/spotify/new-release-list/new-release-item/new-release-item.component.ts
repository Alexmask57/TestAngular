import {Component, Input} from '@angular/core';
import {Albums} from "../../models/albums";
import {Item} from "../../models/item";

@Component({
  selector: 'app-new-release-item',
  templateUrl: './new-release-item.component.html',
  styleUrls: ['./new-release-item.component.css']
})
export class NewReleaseItemComponent {

  @Input() album: Item;

  getDaysAgo(){
    return new Date().getDay() - new Date(this.album.release_date).getDay();
  }
}
