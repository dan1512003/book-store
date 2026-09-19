import {  Component, HostListener, inject, PLATFORM_ID } from '@angular/core';

import { BookDetailOverviewDescription } from '../../../../shared/components/book-detail-overview-description/book-detail-overview-description';
import { BookDetailOverviewInformation } from '../../../../shared/components/book-detail-overview-information/book-detail-overview-information';
import { BookDetailOverviewReviews } from '../../../../shared/components/book-detail-overview-reviews/book-detail-overview-reviews';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  imports: [
     BookDetailOverviewReviews,
      BookDetailOverviewDescription,
    BookDetailOverviewInformation,
    CommonModule,
   
   
  ],
  selector: 'app-book-detail',
  styleUrl: './book-detail.css',
  templateUrl: './book-detail.html',
})
export class BookDetail {
 
  private platformId = inject(PLATFORM_ID);
  activeTab:string = 'description';
selectedImageIndex:number= 0;
maxVisible:number = 7;
ngOnInit() {
    this.updateMaxVisible();
  }


  @HostListener('window:resize')
  onResize() {
    this.updateMaxVisible();
  }

  private updateMaxVisible() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      
     
      if (width >= 850 && width <= 1000) {
        this.maxVisible = 6;
      } 
      else if(width >= 695 && width <= 850){
this.maxVisible = 8;
      }
        else if(width >= 595 && width <= 695){
this.maxVisible = 6;
      }
        else if(width >= 495 && width <= 595){
this.maxVisible = 5;
      }
        else if(width >= 395 && width <= 495){
this.maxVisible = 4;
      }
       else if(width >= 295 && width <= 395){
this.maxVisible = 3;
      }
        else if(width >= 195 && width <= 295){
this.maxVisible = 2;
      }
         else if(width >= 0 && width <= 195){
this.maxVisible = 1;
      }
//       else if(width >= 500 && width <= 750){
// this.maxVisible = 11;
//       }
      else {
        this.maxVisible = 7;
      }
    }
  }

 

 images: string[] = [
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho.webp',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-5.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-02.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-2.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
  '\\assets\\images\\books\\800-800_9be235e6-bd73-45ad-ad67-baf0ae3e850f.webp',
   '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho.webp',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-5.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-02.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-2.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
  '\\assets\\images\\books\\800-800_9be235e6-bd73-45ad-ad67-baf0ae3e850f.webp',
'\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-02.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-2.jpg',
  '\\assets\\images\\books\\ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
  '\\assets\\images\\books\\800-800_9be235e6-bd73-45ad-ad67-baf0ae3e850f.webp',
];

  changeTab(tab: string) {
    this.activeTab = tab;
  }
//logic select thumbnail
previousImage(): void {
  if (this.selectedImageIndex > 0) {
    this.selectedImageIndex--;
    //  this.scrollThumbnailToIndex(this.selectedImageIndex);
  }
}

nextImage(): void {
  if (this.selectedImageIndex < this.images.length - 1) {
    this.selectedImageIndex++;
    //  this.scrollThumbnailToIndex(this.selectedImageIndex);
  }
}
selectImage(index: number): void {
  this.selectedImageIndex = index;
}


}
