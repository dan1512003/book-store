
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
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
export class Home implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('reviewsContent')
  reviewsContent!: ElementRef<HTMLDivElement>;

  // Scroll state sử dụng signal
  showScrollLeft = signal(false);
  showScrollRight = signal(false);

  // Observer
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  private isObserverInitialized = false;
  private measureFrameId: number | null = null;

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

  selectedCategoryId = 1;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.initObservers();
    this.scheduleMeasure();
  }

  selectCategory(category: BookCategory): void {
    this.selectedCategoryId = category.id;
  }

  goToBookDetail(): void {
    this.router.navigate(['/book-detail']);
  }

  // Khởi tạo observer một lần
  private initObservers(): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      this.isObserverInitialized ||
      !this.reviewsContent
    ) {
      return;
    }

    const container = this.reviewsContent.nativeElement;

    if (
      typeof ResizeObserver === 'undefined' ||
      typeof MutationObserver === 'undefined'
    ) {
      this.scheduleMeasure();
      return;
    }

    this.isObserverInitialized = true;

    // Theo dõi thay đổi kích thước
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleMeasure();
    });

    this.resizeObserver.observe(container);

    // Theo dõi kích thước từng item
    this.observeReviewItems();

    // Theo dõi thêm/xóa/thay đổi nội dung
    this.mutationObserver = new MutationObserver(() => {
      this.observeReviewItems();
      this.scheduleMeasure();
    });

    this.mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // Theo dõi các item review
  private observeReviewItems(): void {
    if (!this.resizeObserver || !this.reviewsContent) {
      return;
    }

    const container = this.reviewsContent.nativeElement;

    const items = container.querySelectorAll(
      '.home-customer-reviews-item'
    );

    items.forEach((item) => {
      this.resizeObserver?.observe(item);
    });
  }

  // Gom các lần đo vào một animation frame
  private scheduleMeasure(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.measureFrameId !== null) {
      cancelAnimationFrame(this.measureFrameId);
    }

    this.measureFrameId = requestAnimationFrame(() => {
      this.updateScrollButtons();
      this.measureFrameId = null;
    });
  }

  // Cập nhật trạng thái nút cuộn
  private updateScrollButtons(): void {
    if (!this.reviewsContent) {
      return;
    }

    const container = this.reviewsContent.nativeElement;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const hasScroll = scrollWidth > clientWidth + 1;

    if (!hasScroll) {
      this.showScrollLeft.set(false);
      this.showScrollRight.set(false);
      return;
    }

    this.showScrollLeft.set(scrollLeft > 5);

    this.showScrollRight.set(
      Math.ceil(scrollLeft + clientWidth) < scrollWidth
    );
  }

  // Khi người dùng cuộn danh sách
  onReviewsScroll(): void {
    this.scheduleMeasure();
  }

  // Khi thay đổi kích thước cửa sổ
  @HostListener('window:resize')
  onWindowResize(): void {
    this.scheduleMeasure();
  }

  // Cuộn danh sách review
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

    const gap =
      parseFloat(style.columnGap) ||
      parseFloat(style.gap) ||
      0;

    const scrollAmount = item.offsetWidth + gap;

    container.scrollBy({
      left: direction === 'right'
        ? scrollAmount
        : -scrollAmount,
      behavior: 'smooth',
    });
  }

  // Hủy observer khi component bị destroy
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();

    this.resizeObserver = null;
    this.mutationObserver = null;

    if (this.measureFrameId !== null) {
      cancelAnimationFrame(this.measureFrameId);
      this.measureFrameId = null;
    }
  }
}