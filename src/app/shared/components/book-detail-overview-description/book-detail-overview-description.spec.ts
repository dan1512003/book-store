import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailOverviewDescription } from './book-detail-overview-description';

describe('BookDetailOverviewDescription', () => {
  let component: BookDetailOverviewDescription;
  let fixture: ComponentFixture<BookDetailOverviewDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailOverviewDescription],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailOverviewDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
