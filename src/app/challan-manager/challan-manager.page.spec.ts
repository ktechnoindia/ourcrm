import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallanManagerPage } from './challan-manager.page';

describe('ChallanManagerPage', () => {
  let component: ChallanManagerPage;
  let fixture: ComponentFixture<ChallanManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChallanManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
