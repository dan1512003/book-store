import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  afterNextRender
} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit {

  @ViewChild('reviewsContent')
  reviewsContent!: ElementRef<HTMLDivElement>;

  showScrollLeft = false;
  showScrollRight = false;

  private resizeObserver?: ResizeObserver;

  constructor(private router: Router) {
   
    afterNextRender(() => {
      this.updateScrollButtons();
      this.initResizeObserver();
    });
  }

 goToBookDetail() {
  
    this.router.navigate(['/book-detail']);
  }  
  ngAfterViewInit(): void {
    this.updateScrollButtons();
  }

  private initResizeObserver(): void {
    const container = this.reviewsContent?.nativeElement;

    if (!container) {
      return;
    }

  
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollButtons();
    });

   
    this.resizeObserver.observe(container);

   
    Array.from(container.children).forEach(child => {
      this.resizeObserver?.observe(child);
    });
  }

  onReviewsScroll(): void {
    this.updateScrollButtons();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateScrollButtons();
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

 

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
