import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanydashboardPage } from './companydashboard.page';

describe('CompanydashboardPage', () => {
  let component: CompanydashboardPage;
  let fixture: ComponentFixture<CompanydashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompanydashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
