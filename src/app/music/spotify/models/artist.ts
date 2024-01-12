import {Image} from "./image";

export class Artist {
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  genres: string[];
  followers: {
    href: string;
    total: number
  }
}
