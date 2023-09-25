import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserAuth} from "../../models/user-auth.model";
import {Router} from "@angular/router";
import {Login} from "../../models/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}
  ngOnInit(): void {

  }

  onSubmit(login: Login): void{
    this.authService.login(login.Login, login.Password).subscribe((res: UserAuth) => {
      this.router.navigate(['home']);
    });
  }

  onCancel(){
    this.router.navigate(['home']);
  }

}
