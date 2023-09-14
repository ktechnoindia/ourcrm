import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPurchasePage } from './view-purchase.page';

describe('ViewPurchasePage', () => {
  let component: ViewPurchasePage;
  let fixture: ComponentFixture<ViewPurchasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
