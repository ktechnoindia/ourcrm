import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountreportPage } from './accountreport.page';

describe('AccountreportPage', () => {
  let component: AccountreportPage;
  let fixture: ComponentFixture<AccountreportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
