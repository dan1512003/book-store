
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookDetailOverviewDescription } from '../../../../shared/components/book-detail-overview-description/book-detail-overview-description';
import { BookDetailOverviewInformation } from '../../../../shared/components/book-detail-overview-information/book-detail-overview-information';
import { BookDetailOverviewReviews } from '../../../../shared/components/book-detail-overview-reviews/book-detail-overview-reviews';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookDetailOverviewReviews,
    BookDetailOverviewDescription,
    BookDetailOverviewInformation,
  ],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);

  // =========================================
  // VIEW CHILD
  // =========================================

  @ViewChild('coverThumbnails')
  coverThumbnails?: ElementRef<HTMLDivElement>;

  @ViewChild('thumbnailsContent')
  thumbnailsContent?: ElementRef<HTMLDivElement>;

  @ViewChild('overviewMenuList')
  overviewMenuList?: ElementRef<HTMLDivElement>;

  @ViewChild('relatedContent')
  relatedContent?: ElementRef<HTMLDivElement>;

  // =========================================
  // RESIZE OBSERVERS
  // =========================================

  private coverResizeObserver?: ResizeObserver;
  private galleryResizeObserver?: ResizeObserver;
  private overviewResizeObserver?: ResizeObserver;
  private relatedResizeObserver?: ResizeObserver;

  private measureFrameId: number | null = null;

  // =========================================
  // COMPONENT STATE
  // =========================================

  activeTab = 'description';

  isGalleryOpen = false;

  hasScroll = signal(false);
  hasMenuScroll = signal(false);
  hasRelatedScroll = signal(false);

  selectedImageIndex = 0;

  // Số lượng thumbnail hiển thị
  maxVisible = signal(1);

  // =========================================
  // THUMBNAIL CONFIG
  // =========================================

  private readonly minItemWidth = 60;
  private readonly thumbnailGap = 8;

  // =========================================
  // BOOK IMAGES
  // =========================================

  images: string[] = [
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho.webp',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-5.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-02.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-2.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
    '/assets/images/books/800-800_9be235e6-bd73-45ad-ad67-baf0ae3e850f.webp',

    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho.webp',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-5.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-02.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-2.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
    '/assets/images/books/800-800_9be235e6-bd73-45ad-ad67-baf0ae3e850f.webp',

    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-02.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-2.jpg',
    '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
    '/assets/images/books/800-800_9be235e6-bd73-45ad-ad67-baf0ae3e850f.webp',
  ];

  // =========================================
  // CONSTRUCTOR
  // =========================================
//kiemem hưu rchu kỳ
  // constructor() {
  //   afterNextRender(() => {
  //     this.observeCoverSize();
  //     this.observeOverviewSize();
  //     this.observeRelatedSize();

  //     this.updateMenuScrollState();
  //     this.updateRelatedScrollState();
  //   });
  // }
  
// ngAfterViewInit(): void {
//   this.observeCoverSize();
//       this.observeOverviewSize();
//       this.observeRelatedSize();

//       this.updateMenuScrollState();
//       this.updateRelatedScrollState();
// }


// ngOnChanges(): void {
//   console.log('========== NG ON CHANGES ==========');

//   this.observeCoverSize();
//   this.observeOverviewSize();
//   this.observeRelatedSize();

//   this.updateMenuScrollState();
//   this.updateRelatedScrollState();
// }

// ngOnInit(): void {
//    this.observeCoverSize();
//   this.observeOverviewSize();
//   this.observeRelatedSize();

//   this.updateMenuScrollState();
//   this.updateRelatedScrollState();


// }

// ngDoCheck(): void {
//    this.observeCoverSize();
//   this.observeOverviewSize();
//   this.observeRelatedSize();

//   this.updateMenuScrollState();
//   this.updateRelatedScrollState();
// }

// ngAfterContentInit(): void {
//   this.observeCoverSize();
//   this.observeOverviewSize();
//   this.observeRelatedSize();

//   this.updateMenuScrollState();
//   this.updateRelatedScrollState();
// }

// ngAfterContentChecked(): void {
//   this.observeCoverSize();
//   this.observeOverviewSize();
//   this.observeRelatedSize();

//   this.updateMenuScrollState();
//   this.updateRelatedScrollState();
// }


ngAfterViewChecked(): void {
   this.observeCoverSize();
  this.observeOverviewSize();
  this.observeRelatedSize();

  this.updateMenuScrollState();
  this.updateRelatedScrollState();
}


  // =========================================
  // DESTROY
  // =========================================

  ngOnDestroy(): void {
    if (
      this.measureFrameId !== null &&
      isPlatformBrowser(this.platformId)
    ) {
      cancelAnimationFrame(this.measureFrameId);
      this.measureFrameId = null;
    }

    this.coverResizeObserver?.disconnect();
    this.galleryResizeObserver?.disconnect();
    this.overviewResizeObserver?.disconnect();
    this.relatedResizeObserver?.disconnect();
  }


  private scheduleMeasure(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.measureFrameId !== null) {
      cancelAnimationFrame(this.measureFrameId);
    }

    this.measureFrameId = requestAnimationFrame(() => {
      if (this.isGalleryOpen) {
        this.updateScrollButtons();
      }

      this.updateMenuScrollState();
      this.updateRelatedScrollState();

      this.measureFrameId = null;
    });
  }



  changeTab(tab: string): void {
    this.activeTab = tab;
  }



  private updateMaxVisible(containerWidth: number): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      containerWidth <= 0 ||
      this.images.length === 0
    ) {
      return;
    }

    const minItemWidth = this.minItemWidth;
    const gap = this.thumbnailGap;


    let newMaxVisible = Math.floor(
      (containerWidth + gap) / (minItemWidth + gap),
    );

    if (newMaxVisible < 1) {
      newMaxVisible = 1;
    }

    if (newMaxVisible > this.images.length) {
      newMaxVisible = this.images.length;
    }

    if (this.maxVisible() === newMaxVisible) {
      return;
    }

    this.maxVisible.set(newMaxVisible);

    const itemWidth =
      (containerWidth - (newMaxVisible - 1) * gap) /
      newMaxVisible;

    console.log('[COVER THUMBNAILS RESIZE]', {
      containerWidth,
      minItemWidth,
      gap,
      maxVisible: newMaxVisible,
      itemWidth,
      totalImages: this.images.length,
      hiddenImages: this.images.length - (newMaxVisible - 1),
    });

    this.cdr.markForCheck();
  }



  private observeCoverSize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.coverThumbnails?.nativeElement;

    if (!container) {
      return;
    }

    this.coverResizeObserver?.disconnect();

    this.coverResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
     
        const containerWidth = entry.contentRect.width;

        this.updateMaxVisible(containerWidth);
      }
    });

   
    this.coverResizeObserver.observe(container);

  
    if (container.parentElement) {
      this.coverResizeObserver.observe(container.parentElement);
    }

  
    this.updateMaxVisible(container.getBoundingClientRect().width);
  }


  openGallery(index: number): void {
    if (index < 0 || index >= this.images.length) {
      return;
    }

    // Chỉ hàm này mới mở Gallery
    this.selectedImageIndex = index;
    this.isGalleryOpen = true;

    this.cdr.detectChanges();

    requestAnimationFrame(() => {
      if (!this.isGalleryOpen) {
        return;
      }

      const container = this.thumbnailsContent?.nativeElement;

      if (!container) {
        return;
      }

      this.observeGallerySize();
      this.updateScrollButtons();
      this.scrollThumbnailToIndex(index);
    });
  }

  closeGallery(): void {
    this.isGalleryOpen = false;

    this.hasScroll.set(false);

    this.galleryResizeObserver?.disconnect();
    this.galleryResizeObserver = undefined;
  }



  selectImage(index: number): void {
    if (index < 0 || index >= this.images.length) {
      return;
    }

    // Chọn ảnh không mở Gallery
    this.selectedImageIndex = index;

    if (this.isGalleryOpen) {
      this.scrollThumbnailToIndex(index);
    }
  }

  previousImage(): void {
    if (this.selectedImageIndex <= 0) {
      return;
    }

    this.selectedImageIndex--;

    if (this.isGalleryOpen) {
      this.scrollThumbnailToIndex(this.selectedImageIndex);
    }
  }

  nextImage(): void {
    if (this.selectedImageIndex >= this.images.length - 1) {
      return;
    }

    this.selectedImageIndex++;

    if (this.isGalleryOpen) {
      this.scrollThumbnailToIndex(this.selectedImageIndex);
    }
  }

  // =========================================
  // GALLERY RESIZE OBSERVER
  // =========================================

  private observeGallerySize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.thumbnailsContent?.nativeElement;

    if (!container) {
      return;
    }

    this.galleryResizeObserver?.disconnect();

    this.galleryResizeObserver = new ResizeObserver(() => {
      this.scheduleMeasure();
    });

    this.galleryResizeObserver.observe(container);

    if (container.parentElement) {
      this.galleryResizeObserver.observe(container.parentElement);
    }

    container
      .querySelectorAll<HTMLElement>('.gallery-thumbnail')
      .forEach((thumbnail) => {
        this.galleryResizeObserver?.observe(thumbnail);
      });
  }

  // =========================================
  // SCROLL TO SELECTED THUMBNAIL
  // =========================================

  private scrollThumbnailToIndex(index: number): void {
    const container = this.thumbnailsContent?.nativeElement;

    if (!container || !this.isGalleryOpen) {
      return;
    }

    const thumbnails =
      container.querySelectorAll<HTMLButtonElement>(
        '.gallery-thumbnail',
      );

    const thumbnail = thumbnails[index];

    if (!thumbnail) {
      return;
    }

    thumbnail.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }

  // =========================================
  // GALLERY SCROLL EVENT
  // =========================================

  onThumbnailsScroll(): void {
    this.updateScrollButtons();
  }

  // =========================================
  // SCROLL GALLERY
  // =========================================

  scrollThumbnailsContent(
    direction: 'left' | 'right',
  ): void {
    const container = this.thumbnailsContent?.nativeElement;

    if (!container || !this.isGalleryOpen) {
      return;
    }

    const item =
      container.querySelector<HTMLButtonElement>(
        '.gallery-thumbnail',
      );

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
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      this.updateScrollButtons();
    }, 350);
  }

  // =========================================
  // UPDATE GALLERY SCROLL STATE
  // =========================================

  updateScrollButtons(): void {
    const container = this.thumbnailsContent?.nativeElement;

    if (!container || !this.isGalleryOpen) {
      this.hasScroll.set(false);
      return;
    }

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const hasOverflow = scrollWidth > clientWidth + 1;

    this.hasScroll.set(hasOverflow);

    console.log('[GALLERY SCROLL]', {
      clientWidth,
      scrollWidth,
      hasOverflow,
    });
  }

  // =========================================
  // OVERVIEW MENU
  // =========================================

  onMenuScroll(): void {
    this.updateMenuScrollState();
  }

  scrollMenuContent(
    direction: 'left' | 'right',
  ): void {
    const container = this.overviewMenuList?.nativeElement;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === 'right' ? 200 : -200,
      behavior: 'smooth',
    });

    setTimeout(() => {
      this.updateMenuScrollState();
    }, 300);
  }

  updateMenuScrollState(): void {
    const container = this.overviewMenuList?.nativeElement;

    if (!container || !isPlatformBrowser(this.platformId)) {
      this.hasMenuScroll.set(false);
      return;
    }

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const hasOverflow = scrollWidth > clientWidth + 1;

    this.hasMenuScroll.set(hasOverflow);

    console.log('[MENU SCROLL]', {
      clientWidth,
      scrollWidth,
      hasOverflow,
    });
  }

  // =========================================
  // OBSERVE OVERVIEW SIZE
  // =========================================

  private observeOverviewSize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.overviewMenuList?.nativeElement;

    if (!container) {
      return;
    }

    this.overviewResizeObserver?.disconnect();

    this.overviewResizeObserver = new ResizeObserver(() => {
      this.scheduleMeasure();
    });

    this.overviewResizeObserver.observe(container);

    container
      .querySelectorAll<HTMLElement>('button')
      .forEach((button) => {
        this.overviewResizeObserver?.observe(button);
      });
  }

  // =========================================
  // RELATED BOOKS
  // =========================================

  onRelatedScroll(): void {
    this.updateRelatedScrollState();
  }

  scrollRelatedContent(
    direction: 'left' | 'right',
  ): void {
    const container = this.relatedContent?.nativeElement;

    if (!container) {
      return;
    }

    const card =
      container.querySelector<HTMLDivElement>(
        '.book-detail-related-card',
      );

    if (!card) {
      return;
    }

    const style = getComputedStyle(container);

    const gap =
      parseFloat(style.columnGap) ||
      parseFloat(style.gap) ||
      0;

    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      this.updateRelatedScrollState();
    }, 350);
  }

  updateRelatedScrollState(): void {
    const container = this.relatedContent?.nativeElement;

    if (!container || !isPlatformBrowser(this.platformId)) {
      this.hasRelatedScroll.set(false);
      return;
    }

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const hasOverflow = scrollWidth > clientWidth + 5;

    this.hasRelatedScroll.set(hasOverflow);

    console.log('[RELATED SCROLL]', {
      clientWidth,
      scrollWidth,
      hasOverflow,
    });
  }

  // =========================================
  // OBSERVE RELATED SIZE
  // =========================================

  private observeRelatedSize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.relatedContent?.nativeElement;

    if (!container) {
      return;
    }

    this.relatedResizeObserver?.disconnect();

    this.relatedResizeObserver = new ResizeObserver(() => {
      this.scheduleMeasure();
    });

    this.relatedResizeObserver.observe(container);

    container
      .querySelectorAll<HTMLElement>(
        '.book-detail-related-card',
      )
      .forEach((card) => {
        this.relatedResizeObserver?.observe(card);
      });
  }
}
