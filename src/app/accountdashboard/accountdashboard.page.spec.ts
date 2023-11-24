import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountdashboardPage } from './accountdashboard.page';

describe('AccountdashboardPage', () => {
  let component: AccountdashboardPage;
  let fixture: ComponentFixture<AccountdashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
