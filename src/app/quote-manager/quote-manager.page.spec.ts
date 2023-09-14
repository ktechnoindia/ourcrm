import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteManagerPage } from './quote-manager.page';

describe('QuoteManagerPage', () => {
  let component: QuoteManagerPage;
  let fixture: ComponentFixture<QuoteManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuoteManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
