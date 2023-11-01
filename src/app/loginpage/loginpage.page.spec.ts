import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginpagePage } from './loginpage.page';

describe('LoginpagePage', () => {
  let component: LoginpagePage;
  let fixture: ComponentFixture<LoginpagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
