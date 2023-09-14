import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesManagerPage } from './sales-manager.page';

describe('SalesManagerPage', () => {
  let component: SalesManagerPage;
  let fixture: ComponentFixture<SalesManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalesManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
