import {MovieData} from "./movie-data";

export interface MovieQuerryData{
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: MovieData[]
  total_pages: number
  total_results: number
}
