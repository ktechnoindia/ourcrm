import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendinghsrpPage } from './pendinghsrp.page';

describe('PendinghsrpPage', () => {
  let component: PendinghsrpPage;
  let fixture: ComponentFixture<PendinghsrpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PendinghsrpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
