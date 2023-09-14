import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferLeadPage } from './transfer-lead.page';

describe('TransferLeadPage', () => {
  let component: TransferLeadPage;
  let fixture: ComponentFixture<TransferLeadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransferLeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
