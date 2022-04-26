import {Injectable} from "@angular/core";
import {MovieData} from "../Interfaces/movie-data";
import {MovieService} from "../main-section/movie.service";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {concatMap, map, mergeMap, switchMap, tap, toArray} from "rxjs/operators";
import {ajax} from "rxjs/ajax";

/*
  Прикол в тому, що воно вважає масив однією сутністью, а не множиною чогось
  от і треба його змусити пройтись по цьому масиву а не першому його елементу
    (А перший воно повертає, бо посилання на масив є посиланням на його перший елемент)

*/

@Injectable({
  providedIn: 'root'
})
export class FavoritesService{
  private favoritesSource: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.getFavoriteIds());
  public favorites$: Observable<any[]> = this.favoritesSource.asObservable().pipe(
    // // concatMap((idArr, idx) => {
    // //   console.log(this.favoritesSource.value[idx]);
    // //   return of(this.favoritesSource.value[idx]);
    // // }),
    // // map((idArr) => idArr.map(value => {
    // //   console.log(value)
    // //   return value
    // // })),
    // switchMap((value) =>{
    //   // console.log(value);
    //   return from(value);
    // }),
    // mergeMap(id => {
    //   // console.log(id);
    //   // console.log(ajax.getJSON(`http://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`) as Observable<MovieData>);
    //   // ajax.getJSON(`http://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`).toPromise().then(res => console.log('then 1', res));
    //   return this.movieService.getMovie(id.toString());
    // }),
    // tap(res => console.log(res)),
    // toArray(),
    map(value => value.map(id => (this.movieService.getMovie(id.toString())))),
  );

  constructor(private movieService: MovieService) {
  }

  public addFavorite(id: number): void {
    // console.log('---------------------------------------------------------------------')
    const newFavorites: number[] = this.getFavoriteIds();
    newFavorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    this.favoritesSource.next(newFavorites);
  }

  public removeFavorite(id: number){
    const newFavorites: number[] = this.getFavoriteIds().filter(fav => fav !== id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    this.favoritesSource.next(newFavorites);
  }

  public getFavoriteIds(): number[]{
    return JSON.parse(localStorage.getItem('favorites') as string) || [];
  }
}

