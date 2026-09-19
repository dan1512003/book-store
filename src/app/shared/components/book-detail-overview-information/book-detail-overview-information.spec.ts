import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailOverviewInformation } from './book-detail-overview-information';

describe('BookDetailOverviewInformation', () => {
  let component: BookDetailOverviewInformation;
  let fixture: ComponentFixture<BookDetailOverviewInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailOverviewInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailOverviewInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
