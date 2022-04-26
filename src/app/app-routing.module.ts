import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieListComponent} from "./main-section/movie-list.component";
import {FavorideMoviesComponent} from "./favoride-movies/favoride-movies.component";
import {MovieDetailInfo} from "./main-section/detail-info/movie-detail-info.component";

const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'favorites', component: FavorideMoviesComponent},
  {path: 'movie/:id', component: MovieDetailInfo},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
