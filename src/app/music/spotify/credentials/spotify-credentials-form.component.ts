import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialsService} from "../../../credentials.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-credentials',
  templateUrl: './spotify-credentials-form.component.html',
  styleUrls: ['./spotify-credentials-form.component.css']
})
export class SpotifyCredentialsFormComponent implements OnInit{

  credentialsForm: FormGroup;

  constructor(private credentialsService: CredentialsService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(){
    this.credentialsForm = new FormGroup({
      client_id: new FormControl(null, Validators.required),
      client_secret: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.router.navigate(['/music/spotify']);
    // this.credentialsService.addCredentials(
    //   'Spotify',
    //   this.credentialsForm.get('client_id')?.value,
    //   this.credentialsForm.get('client_secret')?.value
    // ).subscribe(res => {
    //   console.log(res);
    //   this.router.navigate(['/music/spotify']);
    // });
  }
}
