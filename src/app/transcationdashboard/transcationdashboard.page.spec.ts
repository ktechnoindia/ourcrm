import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscationdashboardPage } from './transcationdashboard.page';

describe('TranscationdashboardPage', () => {
  let component: TranscationdashboardPage;
  let fixture: ComponentFixture<TranscationdashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TranscationdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
