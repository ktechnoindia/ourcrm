import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupWiseReportPage } from './group-wise-report.page';

describe('GroupWiseReportPage', () => {
  let component: GroupWiseReportPage;
  let fixture: ComponentFixture<GroupWiseReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroupWiseReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
