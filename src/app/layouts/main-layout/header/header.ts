import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
 constructor(private router: Router) {}
activeMenu: string = 'home';
 activeItem: string = 'home';
  isSideNavOpen:boolean = false;
isSearchOpen:boolean= false;

 goToRegister() {
  
    this.router.navigate(['/register']);
  }  
  
  goToLogin() {
  
    this.router.navigate(['/login']);
  }
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
