export interface MovieData {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string
  adult: boolean;
  rating: string;
  overview: string;
  release_date: Date;
  vote_average: number;
  isFavorite: boolean;
}
