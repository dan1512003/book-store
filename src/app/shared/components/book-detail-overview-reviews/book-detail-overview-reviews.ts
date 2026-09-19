import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-book-detail-overview-reviews',
  styleUrl: './book-detail-overview-reviews.css',
  templateUrl: './book-detail-overview-reviews.html',
})
export class BookDetailOverviewReviews {
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef<HTMLElement>;

  showViewMore: boolean = false;
  isReviewsExpanded: boolean = false;

  private cdr = inject(ChangeDetectorRef);

  constructor() {

    afterNextRender(() => {
      this.checkViewMore();
      this.cdr.detectChanges(); 
    });
  }

  toggleReviews(): void {
    this.isReviewsExpanded = !this.isReviewsExpanded;
  }

  private checkViewMore(): void {
    if (!this.reviewsContainer) return;

    const element = this.reviewsContainer.nativeElement;
    this.showViewMore = element.scrollHeight > element.clientHeight;
    console.log('showViewMore:', this.showViewMore);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isReviewsExpanded) {
      this.checkViewMore();
      this.cdr.detectChanges();
    }
  }
}