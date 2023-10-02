import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemLedgerPage } from './item-ledger.page';

describe('ItemLedgerPage', () => {
  let component: ItemLedgerPage;
  let fixture: ComponentFixture<ItemLedgerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemLedgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
