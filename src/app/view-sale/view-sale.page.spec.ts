import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSalePage } from './view-sale.page';

describe('ViewSalePage', () => {
  let component: ViewSalePage;
  let fixture: ComponentFixture<ViewSalePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
