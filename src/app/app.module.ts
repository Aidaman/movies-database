import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieListComponent } from './main-section/movie-list.component';
import { MovieDetailInfo } from './main-section/detail-info/movie-detail-info.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PaginatorComponent } from './main-section/paginator/paginator.component';
import { FavorideMoviesComponent } from './favoride-movies/favoride-movies.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieListComponent,
    MovieDetailInfo,
    PaginatorComponent,
    FavorideMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
