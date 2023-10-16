import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaddashboardPage } from './leaddashboard.page';

describe('LeaddashboardPage', () => {
  let component: LeaddashboardPage;
  let fixture: ComponentFixture<LeaddashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeaddashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
