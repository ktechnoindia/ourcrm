import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaindashboradPage } from './maindashborad.page';

describe('MaindashboradPage', () => {
  let component: MaindashboradPage;
  let fixture: ComponentFixture<MaindashboradPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaindashboradPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
