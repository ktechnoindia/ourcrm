import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewroleassignPage } from './viewroleassign.page';

describe('ViewroleassignPage', () => {
  let component: ViewroleassignPage;
  let fixture: ComponentFixture<ViewroleassignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewroleassignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
