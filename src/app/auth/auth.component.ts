import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Form, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {exhaustMap, Observable, take} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  submitted: boolean = false;
  loginMode: boolean = true;
  error: string | null = null;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (user)
        this.router.navigate(['/']);
    })
    this.buildForm();
  }

  onSubmit(): void {

    if (!this.authForm.valid)
      return;

    let email = this.authForm.get('email')?.value;
    let username = this.authForm.get('username')?.value;
    let password = this.authForm.get('password')?.value;

    let sub: Observable<any>;

    if (this.loginMode) {
      sub = this.authService.login(email, password);
    } else {
      sub = this.authService.signIn(email, username, password);
    }

    sub.subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.error = e.message;
      },
      complete: () => console.info('login or sign in complete')
    });

  }

  private buildForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    if (!this.loginMode) {
      this.authForm.addControl('username', new FormControl('', Validators.required));
    }
  }

  switchMode() {
    this.loginMode = !this.loginMode;
    this.buildForm();
  }
}
