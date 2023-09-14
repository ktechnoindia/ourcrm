import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExecutivePage } from './add-executive.page';

describe('AddExecutivePage', () => {
  let component: AddExecutivePage;
  let fixture: ComponentFixture<AddExecutivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddExecutivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
