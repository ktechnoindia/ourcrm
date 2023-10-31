import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterdashboardPage } from './masterdashboard.page';

describe('MasterdashboardPage', () => {
  let component: MasterdashboardPage;
  let fixture: ComponentFixture<MasterdashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
