import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddaccountPage } from './addaccount.page';

describe('AddaccountPage', () => {
  let component: AddaccountPage;
  let fixture: ComponentFixture<AddaccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
