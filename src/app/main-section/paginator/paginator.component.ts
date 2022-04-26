import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() page: number = this.movieService.currentPage$.value;
  @Input() lastPage!: number;

  constructor(public movieService: MovieService) {  }

  ngOnInit(): void {
    this.page = this.movieService.currentPage$.value;
  }

  //toFirstPage
  public toFirstPage(): void{
    this.toPage(1)
  }
  //toPrevPage
  public toPrevPage(): void{
    if (this.page != 1)
      this.toPage(this.page - 1)
  }
  //toNextPage
  public toNextPage(): void{
    if (this.page != this.lastPage)
      this.toPage(this.page + 1)
  }
  //toLastPage
  public toLastPage(): void{
    this.toPage(this.lastPage)
  }
  public toPage(pageIndex: number): void{
    for (let i = -1; i < 2; i++) {
      this.movieService.allowedPages[i+1] = pageIndex+i
    }
    this.onPageChanged.emit(pageIndex);
    this.movieService.currentPage$.next(pageIndex);
  }

  public movePaginatorBackwards(): void {
    for (let i = 0; i < 3; i++) {
      this.movieService.allowedPages[i] -= 3;
    }
  }
  public movePaginatorForwards(): void {
    for (let i = 0; i < 3; i++) {
      this.movieService.allowedPages[i] += 3;
    }
  }
}
