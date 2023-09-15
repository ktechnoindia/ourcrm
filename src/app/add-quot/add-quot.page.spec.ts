import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuotPage } from './add-quot.page';

describe('AddQuotPage', () => {
  let component: AddQuotPage;
  let fixture: ComponentFixture<AddQuotPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddQuotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
