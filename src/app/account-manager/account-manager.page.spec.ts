import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AccountManagerPage } from './account-manager.page';

describe('AccountManagerPage', () => {
  let component: AccountManagerPage;
  let fixture: ComponentFixture<AccountManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
