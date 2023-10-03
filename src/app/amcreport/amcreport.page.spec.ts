import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmcreportPage } from './amcreport.page';

describe('AmcreportPage', () => {
  let component: AmcreportPage;
  let fixture: ComponentFixture<AmcreportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AmcreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
