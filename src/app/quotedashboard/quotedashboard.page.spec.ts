import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotedashboardPage } from './quotedashboard.page';

describe('QuotedashboardPage', () => {
  let component: QuotedashboardPage;
  let fixture: ComponentFixture<QuotedashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuotedashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
