import {Image} from "./image";

export class Item {
  id: string;
  album_type: string;
  total_tracks: number;
  images: Image[];
  name: string;
  release_date: string;
  artists: {
    id: string;
    name: string;
  }[]
}
