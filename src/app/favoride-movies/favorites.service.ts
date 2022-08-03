import {Injectable} from "@angular/core";
import {MovieService} from "../main-section/movie.service";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService{
  private favoritesSource: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.getFavoriteIds());
  public favorites$: Observable<any[]> = this.favoritesSource.asObservable().pipe(
    map(value => value.map(id => (this.movieService.getMovie(id.toString())))),
  );

  constructor(private movieService: MovieService) {}

  public addFavorite(id: number): void {
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

