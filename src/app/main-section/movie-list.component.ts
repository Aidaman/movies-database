import {Component, OnInit} from '@angular/core';
import {MovieService} from "./movie.service";
import {MovieData} from "../Interfaces/movie-data";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main-section',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
//MovieListComponent
export class MovieListComponent implements OnInit {
  public movieList$: Observable<MovieData[]> = this.movieService.movieList$;

  constructor(public movieService: MovieService) {
  }

  ngOnInit(): void {
    this.processGetQuerry(this.movieService.currentPage$.value);
  }

  public processGetQuerry(e: number){
    this.movieService.currentPage$.next(e);
  }
}
