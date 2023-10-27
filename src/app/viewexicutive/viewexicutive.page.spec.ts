import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewexicutivePage } from './viewexicutive.page';

describe('ViewexicutivePage', () => {
  let component: ViewexicutivePage;
  let fixture: ComponentFixture<ViewexicutivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewexicutivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
