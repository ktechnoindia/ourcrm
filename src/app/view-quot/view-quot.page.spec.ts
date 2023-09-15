import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewQuotPage } from './view-quot.page';

describe('ViewQuotPage', () => {
  let component: ViewQuotPage;
  let fixture: ComponentFixture<ViewQuotPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewQuotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
