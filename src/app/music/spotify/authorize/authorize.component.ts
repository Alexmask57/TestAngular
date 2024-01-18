import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent {

  constructor(private router: Router) {
  }

  authorizationWithCode() {
    var state = this.generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    var client_id = '2e386e7885b64d89a7cac99b0b2b2e01';
    var redirect_uri = 'http://localhost:4200';
    document.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=2e386e7885b64d89a7cac99b0b2b2e01&scope=${scope}&redirect_uri=http://localhost:4200&state=${state}`
  }

  authorizationWithCodeUrl(){
    var state = this.generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    var client_id = '2e386e7885b64d89a7cac99b0b2b2e01';
    var redirect_uri = 'http://localhost:4200';
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=2e386e7885b64d89a7cac99b0b2b2e01&scope=${scope}&redirect_uri=http://localhost:4200&state=${state}`
  }

  private generateRandomString = (length: number) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
}
