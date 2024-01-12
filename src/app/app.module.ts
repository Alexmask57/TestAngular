import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialDesignModule} from "./material-design.module";
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MusicComponent} from './music/music.component';
import {AppleMusicComponent} from './music/apple-music/apple-music.component';
import {SpotifyComponent} from './music/spotify/spotify.component';
import {YoutubeMusicComponent} from './music/youtube-music/youtube-music.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {SpotifyInterceptor} from "./music/spotify/spotify.interceptor";
import {AuthInterceptor} from "./auth/auth.interceptor";
import { CredentialsComponent } from './music/spotify/credentials/credentials.component';
import { NewReleaseListComponent } from './music/spotify/new-release-list/new-release-list.component';
import { NewReleaseItemComponent } from "./music/spotify/new-release-list/new-release-item/new-release-item.component";
import { ArtistDetailComponent } from './music/spotify/artist-detail/artist-detail.component';
import { NewReleaseItemLoadingComponent } from "./music/spotify/new-release-list/new-release-item-loading/new-release-item-loading.component";
import { PaginatorComponent } from './shared/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    MusicComponent,
    AppleMusicComponent,
    SpotifyComponent,
    YoutubeMusicComponent,
    LoadingSpinnerComponent,
    CredentialsComponent,
    NewReleaseListComponent,
    NewReleaseItemComponent,
    ArtistDetailComponent,
    NewReleaseItemLoadingComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
