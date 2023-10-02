import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockLedgerPage } from './stock-ledger.page';

describe('StockLedgerPage', () => {
  let component: StockLedgerPage;
  let fixture: ComponentFixture<StockLedgerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockLedgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
