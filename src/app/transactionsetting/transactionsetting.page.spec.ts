import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsettingPage } from './transactionsetting.page';

describe('TransactionsettingPage', () => {
  let component: TransactionsettingPage;
  let fixture: ComponentFixture<TransactionsettingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionsettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
