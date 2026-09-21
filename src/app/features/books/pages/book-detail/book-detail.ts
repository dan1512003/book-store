import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { BookDetailOverviewDescription } from '../../../../shared/components/book-detail-overview-description/book-detail-overview-description';
import { BookDetailOverviewInformation } from '../../../../shared/components/book-detail-overview-information/book-detail-overview-information';
import { BookDetailOverviewReviews } from '../../../../shared/components/book-detail-overview-reviews/book-detail-overview-reviews';
import { FormsModule } from '@angular/forms';

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
export class BookDetail {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);


  @ViewChild('thumbnailsContent')
  thumbnailsContent?: ElementRef<HTMLDivElement>;
@ViewChild('overviewMenuList')
  overviewMenuList?: ElementRef<HTMLDivElement>;
@ViewChild('relatedContent')
  relatedContent?: ElementRef<HTMLDivElement>;

  activeTab = 'description';

  isGalleryOpen = false;
hasScroll = false;
hasMenuScroll = false;
hasRelatedScroll = false;
  selectedImageIndex = 0;

  maxVisible = 7;



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

  constructor() {

    afterNextRender(() => {
    this.updateMenuScrollState();
    this.updateRelatedScrollState();
    });
  }
  ngOnInit(): void {
    this.updateMaxVisible();
  }

   @HostListener('window:resize')
onResize(): void {
 
  requestAnimationFrame(() => {

    this.updateMaxVisible();
  this.updateScrollButtons();

this.updateMenuScrollState();
this.updateRelatedScrollState();
   
  });

 
}


  changeTab(tab: string): void {
    this.activeTab = tab;
  }



openGallery(index: number): void {
  if (
    index < 0 ||
    index >= this.images.length
  ) {
    return;
  }

  this.selectedImageIndex = index;

  this.isGalleryOpen = true;

  this.cdr.detectChanges();

  requestAnimationFrame(() => {

    


    this.updateScrollButtons();

    this.scrollThumbnailToIndex(
      this.selectedImageIndex
    );
   
  });
}


  closeGallery(): void {
    this.isGalleryOpen = false;
  
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.images.length) {
      return;
    }

    this.selectedImageIndex = index;
    this.scrollThumbnailToIndex(index);
  }

  previousImage(): void {
    if (this.selectedImageIndex <= 0) {
      return;
    }

    this.selectedImageIndex--;

    this.scrollThumbnailToIndex(
      this.selectedImageIndex
    );
  }

  nextImage(): void {
    if (
      this.selectedImageIndex >=
      this.images.length - 1
    ) {
      return;
    }

    this.selectedImageIndex++;

    this.scrollThumbnailToIndex(
      this.selectedImageIndex
    );
  }


  private updateMaxVisible(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const width = window.innerWidth;

    if (width <= 195) {
      this.maxVisible = 1;
    } else if (width <= 295) {
      this.maxVisible = 2;
    } else if (width <= 395) {
      this.maxVisible = 3;
    } else if (width <= 495) {
      this.maxVisible = 4;
    } else if (width <= 595) {
      this.maxVisible = 5;
    } else if (width <= 695) {
      this.maxVisible = 6;
    } else if (width <= 850) {
      this.maxVisible = 8;
    } else if (width <= 1000) {
      this.maxVisible = 6;
    } else {
      this.maxVisible = 7;
    }
  }




  private scrollThumbnailToIndex(
    index: number
  ): void {
    const container =
      this.thumbnailsContent?.nativeElement;

    if (!container) {
      return;
    }

    const thumbnails =
      container.querySelectorAll<HTMLButtonElement>(
        '.gallery-thumbnail'
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

  onThumbnailsScroll(): void {
    this.updateScrollButtons();
  }

  scrollThumbnailsContent(
    direction: 'left' | 'right'
  ): void {
    const container =
      this.thumbnailsContent?.nativeElement;

    if (!container) {
      return;
    }

    const item =
      container.querySelector<HTMLButtonElement>(
        '.gallery-thumbnail'
      );

    if (!item) {
      return;
    }

    const style = getComputedStyle(container);

    const gap =
      parseFloat(style.columnGap) ||
      parseFloat(style.gap) ||
      0;

    const scrollAmount =
      item.offsetWidth + gap;

    container.scrollBy({
      left:
        direction === 'right'
          ? scrollAmount
          : -scrollAmount,

      behavior: 'smooth',
    });

    setTimeout(() => {
      this.updateScrollButtons();
    }, 350);
  }


updateScrollButtons(): void {
  const container = this.thumbnailsContent?.nativeElement;

  console.log('updateScrollButtons');
  console.log('isGalleryOpen:', this.isGalleryOpen);
  console.log('container:', container);

  if (!container) {
    console.log('KHÔNG CÓ thumbnailsContent');
    this.hasScroll = false;
    this.cdr.detectChanges();
    return;
  }

  const scrollLeft = container.scrollLeft;
  const clientWidth = container.clientWidth;
  const scrollWidth = container.scrollWidth;


  this.hasScroll = Math.round(scrollWidth) > Math.round(clientWidth) + 1;

  console.log('hasScroll:', this.hasScroll);

  if (!this.hasScroll) {
    console.log('KHÔNG CÓ SCROLL');
  } else {
    console.log('CÓ SCROLL');
    console.log({
      scrollLeft,
      clientWidth,
      scrollWidth,
    });
  }



 
  this.cdr.detectChanges();
}




onMenuScroll(): void {
    this.updateMenuScrollState();
  }

  scrollMenuContent(direction: 'left' | 'right'): void {
    const container = this.overviewMenuList?.nativeElement;
    if (!container) return;

    const scrollAmount = 200; 

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      this.updateMenuScrollState();
    }, 300);
  }

  updateMenuScrollState(): void {
    const container = this.overviewMenuList?.nativeElement;

    if (!container || !isPlatformBrowser(this.platformId)) {
      this.hasMenuScroll = false;
      this.cdr.detectChanges();
      return;
    }

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    this.hasMenuScroll = Math.round(scrollWidth) > Math.round(clientWidth) + 1;
    this.cdr.detectChanges();
  }


  onRelatedScroll(): void {
    this.updateRelatedScrollState();
  }

 
  scrollRelatedContent(direction: 'left' | 'right'): void {
    const container = this.relatedContent?.nativeElement;
    if (!container) return;

   
    const card = container.querySelector<HTMLDivElement>('.book-detail-related-card');
    if (!card) return;

  
    const style = getComputedStyle(container);
    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;

    
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
      this.hasRelatedScroll = false;
      this.cdr.detectChanges();
      return;
    }

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    this.hasRelatedScroll = Math.round(scrollWidth) > Math.round(clientWidth) + 1;
    this.cdr.detectChanges();
  }
}
