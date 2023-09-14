import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadManagerPage } from './lead-manager.page';

describe('LeadManagerPage', () => {
  let component: LeadManagerPage;
  let fixture: ComponentFixture<LeadManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeadManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
