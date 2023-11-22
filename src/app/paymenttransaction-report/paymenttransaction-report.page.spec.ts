import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymenttransactionReportPage } from './paymenttransaction-report.page';

describe('PaymenttransactionReportPage', () => {
  let component: PaymenttransactionReportPage;
  let fixture: ComponentFixture<PaymenttransactionReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymenttransactionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
