import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewsupplierPage } from './viewsupplier.page';

describe('ViewsupplierPage', () => {
  let component: ViewsupplierPage;
  let fixture: ComponentFixture<ViewsupplierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewsupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
