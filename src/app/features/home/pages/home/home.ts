import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  afterNextRender,
  inject
} from '@angular/core';

import { Router } from '@angular/router';


@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit {
 private readonly cdr = inject(ChangeDetectorRef);
  @ViewChild('reviewsContent')
  reviewsContent!: ElementRef<HTMLDivElement>;

  showScrollLeft = false;
  showScrollRight = false;



  constructor(private router: Router) {
   
    afterNextRender(() => {
      this.updateScrollButtons();

    });
  }

 goToBookDetail() {
  
    this.router.navigate(['/book-detail']);
  }  
   
  ngAfterViewInit(): void {
    this.updateScrollButtons();
  }



  onReviewsScroll(): void {
    this.updateScrollButtons();
  }

  @HostListener('window:resize')
  onWindowResize(): void {

     requestAnimationFrame(() => {

 this.updateScrollButtons();
   
  });
    
  }

  updateScrollButtons(): void {
    if (!this.reviewsContent) {
      return;
    }

    const container = this.reviewsContent.nativeElement;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const hasScroll = scrollWidth > clientWidth + 1;

    if (!hasScroll) {
      this.showScrollLeft = false;
      this.showScrollRight = false;
      return;
    }

    this.showScrollLeft = scrollLeft > 5;

    this.showScrollRight =
      Math.ceil(scrollLeft + clientWidth) < scrollWidth;

        this.cdr.detectChanges();
  }

  scrollReviews(direction: 'left' | 'right'): void {
    if (!this.reviewsContent) {
      return;
    }

    const container = this.reviewsContent.nativeElement;

    const item = container.querySelector(
      '.home-customer-reviews-item'
    ) as HTMLElement | null;

    if (!item) {
      return;
    }

    const style = getComputedStyle(container);

    const gap = parseFloat(style.columnGap) || 0;

    const scrollAmount = item.offsetWidth + gap;

    container.scrollBy({
      left: direction === 'right'
        ? scrollAmount
        : -scrollAmount,
      behavior: 'smooth'
    });
  }

 


}
