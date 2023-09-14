import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmcManagerPage } from './amc-manager.page';

describe('AmcManagerPage', () => {
  let component: AmcManagerPage;
  let fixture: ComponentFixture<AmcManagerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AmcManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
