import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailOverviewReviews } from './book-detail-overview-reviews';

describe('BookDetailOverviewReviews', () => {
  let component: BookDetailOverviewReviews;
  let fixture: ComponentFixture<BookDetailOverviewReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailOverviewReviews],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailOverviewReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
