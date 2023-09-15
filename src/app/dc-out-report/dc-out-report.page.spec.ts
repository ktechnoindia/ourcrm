import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcOutReportPage } from './dc-out-report.page';

describe('DcOutReportPage', () => {
  let component: DcOutReportPage;
  let fixture: ComponentFixture<DcOutReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DcOutReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
