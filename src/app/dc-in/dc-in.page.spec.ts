import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcInPage } from './dc-in.page';

describe('DcInPage', () => {
  let component: DcInPage;
  let fixture: ComponentFixture<DcInPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DcInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
