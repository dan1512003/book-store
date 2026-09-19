import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-book-detail-overview-description',
  styleUrl: './book-detail-overview-description.css',
  templateUrl: './book-detail-overview-description.html',
})
export class BookDetailOverviewDescription  {
  constructor() {
   afterNextRender(() => {
      this.checkViewMore();
       this.cdr.detectChanges(); 
    });
  }
  @ViewChild('descriptionContainer')
  descriptionContainer!: ElementRef<HTMLElement>;

  showViewMore = false;
  isDescriptionExpanded = false;

  private cdr = inject(ChangeDetectorRef);

  toggleDescription(): void {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  private checkViewMore(): void {
    if (!this.descriptionContainer) return;

    const element = this.descriptionContainer.nativeElement;
    this.showViewMore = element.scrollHeight > element.clientHeight;
    console.log('showViewMore2 DDDD:', this.showViewMore);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isDescriptionExpanded) {
      this.checkViewMore();
      this.cdr.detectChanges();
    }
  }
}