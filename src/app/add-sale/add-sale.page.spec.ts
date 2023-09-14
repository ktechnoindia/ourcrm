import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSalePage } from './add-sale.page';

describe('AddSalePage', () => {
  let component: AddSalePage;
  let fixture: ComponentFixture<AddSalePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
