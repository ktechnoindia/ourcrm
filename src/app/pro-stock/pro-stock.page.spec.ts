import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProStockPage } from './pro-stock.page';

describe('ProStockPage', () => {
  let component: ProStockPage;
  let fixture: ComponentFixture<ProStockPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
