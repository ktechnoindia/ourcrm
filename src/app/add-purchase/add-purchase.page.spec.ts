import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPurchasePage } from './add-purchase.page';

describe('AddPurchasePage', () => {
  let component: AddPurchasePage;
  let fixture: ComponentFixture<AddPurchasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
