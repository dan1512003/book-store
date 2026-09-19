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
  selector: 'app-book-detail-overview-information',
  styleUrl: './book-detail-overview-information.css',
  templateUrl: './book-detail-overview-information.html',
})
export class BookDetailOverviewInformation {
  @ViewChild('informationContainer')
  informationContainer!: ElementRef<HTMLElement>;

  showViewMore = false;
  isInformationExpanded = false;

  private cdr = inject(ChangeDetectorRef);

  constructor() {

    afterNextRender(() => {
      this.checkViewMore();
      this.cdr.detectChanges(); 
    });
  }

  toggleInformation(): void {
    this.isInformationExpanded = !this.isInformationExpanded;
  }

  private checkViewMore(): void {
    if (!this.informationContainer) {
      return;
    }

    const element = this.informationContainer.nativeElement;
    this.showViewMore = element.scrollHeight > element.clientHeight;
    console.log('showViewMore:', this.showViewMore);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isInformationExpanded) {
      this.checkViewMore();
      this.cdr.detectChanges();
    }
  }
}