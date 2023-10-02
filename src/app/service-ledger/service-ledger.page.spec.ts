import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceLedgerPage } from './service-ledger.page';

describe('ServiceLedgerPage', () => {
  let component: ServiceLedgerPage;
  let fixture: ComponentFixture<ServiceLedgerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServiceLedgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
