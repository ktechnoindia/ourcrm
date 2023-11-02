import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleassignPage } from './roleassign.page';

describe('RoleassignPage', () => {
  let component: RoleassignPage;
  let fixture: ComponentFixture<RoleassignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RoleassignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
