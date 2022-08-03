import {Injectable, OnInit} from '@angular/core';
import { MovieData } from "../Interfaces/movie-data";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {MovieQuerryData} from "../Interfaces/movieQuerryData";
import {newArray} from "@angular/compiler/src/util";
import {map, shareReplay, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService{
  public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public totalPage!: number;
  public allowedPages: number[] = [0, 1, 2];
  public selectedMovieId: number = 0;

  public movieList$: Observable<MovieData[]> = this.currentPage$.pipe(
    switchMap( page => {
      return this.getMoviesByPage(page)
    }),
    map( result => {
      this.totalPage = result.total_pages-1;
      return result.results;
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {
  }

  public getMoviesByPage(pageIdx: number): Observable<MovieQuerryData>{
     return this.http.get<MovieQuerryData>(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${pageIdx}`);
  }
  public getMovie(id: string): Observable<MovieData>{
     return this.http.get<MovieData>(`http://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`);
  }
}
