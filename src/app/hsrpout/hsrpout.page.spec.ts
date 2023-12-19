import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HsrpoutPage } from './hsrpout.page';

describe('HsrpoutPage', () => {
  let component: HsrpoutPage;
  let fixture: ComponentFixture<HsrpoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HsrpoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
