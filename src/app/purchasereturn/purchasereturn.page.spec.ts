import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchasereturnPage } from './purchasereturn.page';

describe('PurchasereturnPage', () => {
  let component: PurchasereturnPage;
  let fixture: ComponentFixture<PurchasereturnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PurchasereturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
