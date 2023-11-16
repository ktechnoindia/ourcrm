import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSalesreturnPage } from './view-salesreturn.page';

describe('ViewSalesreturnPage', () => {
  let component: ViewSalesreturnPage;
  let fixture: ComponentFixture<ViewSalesreturnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewSalesreturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
