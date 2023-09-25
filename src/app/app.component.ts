import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TestAngular';

  constructor(readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {

  }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.doLogout();
    this.router.navigate(['home']);
  }

}
