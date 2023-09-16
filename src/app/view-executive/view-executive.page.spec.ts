import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExecutivePage } from './view-executive.page';

describe('ViewExecutivePage', () => {
  let component: ViewExecutivePage;
  let fixture: ComponentFixture<ViewExecutivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewExecutivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
