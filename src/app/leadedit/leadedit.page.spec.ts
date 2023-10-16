import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadeditPage } from './leadedit.page';

describe('LeadeditPage', () => {
  let component: LeadeditPage;
  let fixture: ComponentFixture<LeadeditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeadeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
