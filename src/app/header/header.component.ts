import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {UserAuth} from "../../models/user-auth.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;

  username:string | undefined | null = null;

  constructor(readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = this.isAuthenticated ? user?.username : null;
    })
  }

  login() {
    console.log(this.isAuthenticated);
    this.router.navigate(['auth']);
    this.router.url
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
