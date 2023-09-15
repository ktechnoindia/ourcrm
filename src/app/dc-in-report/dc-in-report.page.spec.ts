import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcInReportPage } from './dc-in-report.page';

describe('DcInReportPage', () => {
  let component: DcInReportPage;
  let fixture: ComponentFixture<DcInReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DcInReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
