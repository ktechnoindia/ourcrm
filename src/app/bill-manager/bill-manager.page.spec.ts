import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillManagerPage } from './bill-manager.page';

describe('BillManagerPage', () => {
  let component: BillManagerPage;
  let fixture: ComponentFixture<BillManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BillManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
