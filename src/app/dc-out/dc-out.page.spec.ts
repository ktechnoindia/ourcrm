import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcOutPage } from './dc-out.page';

describe('DcOutPage', () => {
  let component: DcOutPage;
  let fixture: ComponentFixture<DcOutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DcOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
