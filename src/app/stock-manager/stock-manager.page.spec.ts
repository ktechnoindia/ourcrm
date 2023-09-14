import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockManagerPage } from './stock-manager.page';

describe('StockManagerPage', () => {
  let component: StockManagerPage;
  let fixture: ComponentFixture<StockManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
