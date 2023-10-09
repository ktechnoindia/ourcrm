import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsercreatePage } from './usercreate.page';

describe('UsercreatePage', () => {
  let component: UsercreatePage;
  let fixture: ComponentFixture<UsercreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsercreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
