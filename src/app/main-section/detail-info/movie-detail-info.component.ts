import {  Component,  OnInit } from '@angular/core';
import {MovieData} from "../../Interfaces/movie-data";
import {MovieService} from "../movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {lastValueFrom, Observable, take} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {FavoritesService} from "../../favoride-movies/favorites.service";

@Component({
  selector: 'app-detail-info',
  templateUrl: './movie-detail-info.component.html',
  styleUrls: ['./movie-detail-info.component.scss']
})
//MovieDetailInfoComponent
export class MovieDetailInfo implements OnInit {
  public isNextAvailable: boolean = true;
  public movie$: Observable<MovieData> = this.route.params
    .pipe(
      switchMap( (params) => {
        this.movieService.selectedMovieId = +params.id;
        return this.movieService.getMovie(params.id);

      })
    )

  constructor(public movieService: MovieService,
              private favService: FavoritesService,
              private route: ActivatedRoute,
              private router: Router) {  }

  ngOnInit(): void {}

  public async toNextMovie(): Promise<any> {
    let movies = await lastValueFrom(this.movieService.movieList$.pipe(take(1)));
    let idx = movies.findIndex(movie => movie.id === this.movieService.selectedMovieId);
    if (idx >= movies.length-2){
      this.movieService.currentPage$.next(this.movieService.currentPage$.value+1);
      console.log(idx, movies);

      //Don't forget to move Paginator showed values
      for (let i = 0; i < 3; i++) {
        this.movieService.allowedPages[i] += 1;
      }
    } else await this.router.navigate(['/movie', movies[idx+1].id]);
  }

  public addToFavorite(id: number) {
    this.favService.addFavorite(id);
  }

  public backToMainPage(): void {
    this.router.navigate(['']);
  }
}
