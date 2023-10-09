import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddattributePage } from './addattribute.page';

describe('AddattributePage', () => {
  let component: AddattributePage;
  let fixture: ComponentFixture<AddattributePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddattributePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
