import {Component} from '@angular/core';
import {FavoritesService} from "./favorites.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favoride-movies',
  templateUrl: './favoride-movies.component.html',
  styleUrls: ['./favoride-movies.component.scss'],
})
export class FavorideMoviesComponent{
  public favMovies: Observable<any[]> = this.favService.favorites$;

  constructor(public favService: FavoritesService) { }
}
