import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPurchasereturnPage } from './view-purchasereturn.page';

describe('ViewPurchasereturnPage', () => {
  let component: ViewPurchasereturnPage;
  let fixture: ComponentFixture<ViewPurchasereturnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewPurchasereturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
