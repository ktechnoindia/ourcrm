import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLeadPage } from './view-lead.page';

describe('ViewLeadPage', () => {
  let component: ViewLeadPage;
  let fixture: ComponentFixture<ViewLeadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewLeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
