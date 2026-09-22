import { Component, HostListener } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
@Component({
   imports: [Header,RouterOutlet,Footer],
  selector: 'app-main-layout',
  styleUrl: './main-layout.css',
  templateUrl: './main-layout.html',
})
export class MainLayout {
  showContact = false;
  showBackToTop = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY;


    this.showBackToTop = scrollTop > 300;
  }



  toggleContact(): void {
    this.showContact = !this.showContact;
  }



  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.showBackToTop = false;
  }
}
