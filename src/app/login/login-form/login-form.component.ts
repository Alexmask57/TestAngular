import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../../models/login.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loginModel: Login;
  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<Login>;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = LoginFormComponent.buildForm();
    this.loginModel = {Password: "", Login: ""};
  }

  onSubmit() {
    this.submitted = true;
    this.loginModel.Login = this.form.get('login')?.value;
    this.loginModel.Password = this.form.get('password')?.value;
    this.submitEvent$.emit(this.loginModel);
  }

  onCancel() {
    this.submitted = true;
    this.cancelEvent$.emit();
  }

  ngOnInit(): void {
    this.form.patchValue({
      login: this.loginModel.Login,
      password: this.loginModel.Password
    });
  }

  private static buildForm(): FormGroup {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

}
