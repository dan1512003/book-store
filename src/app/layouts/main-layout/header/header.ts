import { Component } from '@angular/core';


@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {

activeMenu: string = 'home';
 activeItem: string = 'home';
  isSideNavOpen:boolean = false;
isSearchOpen:boolean= false;

openSearch():void {
  this.isSearchOpen=true
}
closeSearch(): void {
    this.isSearchOpen = false;
  }
  openSideNav(): void {
    this.isSideNavOpen = true;
  }

  closeSideNav(): void {
    this.isSideNavOpen = false;
  }
  setActive(item: string): void {
    this.activeItem = item;
  }
}
