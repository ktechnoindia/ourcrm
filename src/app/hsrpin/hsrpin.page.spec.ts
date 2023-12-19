import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HsrpinPage } from './hsrpin.page';

describe('HsrpinPage', () => {
  let component: HsrpinPage;
  let fixture: ComponentFixture<HsrpinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HsrpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
