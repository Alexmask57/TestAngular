import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {MusicComponent} from "./music/music.component";
import {AppleMusicComponent} from "./music/apple-music/apple-music.component";
import {SpotifyComponent} from "./music/spotify/spotify.component";
import {YoutubeMusicComponent} from "./music/youtube-music/youtube-music.component";
import {authGuard} from "./auth/auth.guard";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'music', component: MusicComponent,
    canActivate: [authGuard],
    children: [
      { path: 'apple-music', component: AppleMusicComponent },
      { path: 'spotify', component: SpotifyComponent },
      { path: 'youtube-music', component: YoutubeMusicComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
