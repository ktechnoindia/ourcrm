import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceipttransactionReportPage } from './receipttransaction-report.page';

describe('ReceipttransactionReportPage', () => {
  let component: ReceipttransactionReportPage;
  let fixture: ComponentFixture<ReceipttransactionReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceipttransactionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
