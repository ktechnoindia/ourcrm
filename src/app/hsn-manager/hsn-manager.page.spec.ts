import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HsnManagerPage } from './hsn-manager.page';

describe('HsnManagerPage', () => {
  let component: HsnManagerPage;
  let fixture: ComponentFixture<HsnManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HsnManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
