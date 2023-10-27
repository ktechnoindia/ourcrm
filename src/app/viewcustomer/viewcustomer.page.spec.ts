import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewcustomerPage } from './viewcustomer.page';

describe('ViewcustomerPage', () => {
  let component: ViewcustomerPage;
  let fixture: ComponentFixture<ViewcustomerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewcustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
