import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GstPage } from './gst.page';

describe('GstPage', () => {
  let component: GstPage;
  let fixture: ComponentFixture<GstPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
