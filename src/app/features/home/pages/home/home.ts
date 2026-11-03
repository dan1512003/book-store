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

interface BookCategory {
  id: number;
  type: string;
  description: string;
  number: string;
  icon: string;
}
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
bookCategories: BookCategory[] = [
  {
    id: 1,
    type: 'Văn Học',
    description: 'Được đọc nhiều nhất',
    number: '1.240 cuốn',
    icon: '✦'
  },
  {
    id: 2,
    type: 'Tâm Lý Học',
    description: 'Hiểu mình, hiểu người',
    number: '486 cuốn',
    icon: '◈'
  },
  {
    id: 3,
    type: 'Kinh Tế',
    description: 'Tư duy & tài chính',
    number: '732 cuốn',
    icon: '◆'
  },
  {
    id: 4,
    type: 'Lịch Sử',
    description: 'Chuyện xưa còn mãi',
    number: '398 cuốn',
    icon: '◉'
  },
  {
    id: 5,
    type: 'Thiếu Nhi',
    description: 'Nuôi dưỡng tâm hồn',
    number: '615 cuốn',
    icon: '◇'
  },
  {
    id: 6,
    type: 'Khoa Học',
    description: 'Khám phá thế giới',
    number: '520 cuốn',
    icon: '⬡'
  }
];




  constructor(private router: Router) {
   
    afterNextRender(() => {
      this.updateScrollButtons();

    });
  }

selectedCategoryId: number = 1;


selectCategory(category: BookCategory): void {
  this.selectedCategoryId = category.id;
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
