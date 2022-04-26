import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

//Ця штука локальна, тому я залишу її тут, до того ж неекспортну, бо нахєр воно треба?
interface selectOption{
  id: string;
  option: string
  routerLink: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public optionArr: selectOption[] = [
    {
      id: 'MainPage',
      option: 'Main Page',
      routerLink: '/',
    },
    {
      id: 'FavoritesPage',
      option: 'Favorites',
      routerLink: '/favorites',
    }
  ]
  public isSelectOpen: boolean = false;
  public selectedOption: string = 'Main Page';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toStartPage() {
    this.router.navigate(['']);
  }
}
