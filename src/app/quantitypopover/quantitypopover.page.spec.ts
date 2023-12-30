import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantitypopoverPage } from './quantitypopover.page';

describe('QuantitypopoverPage', () => {
  let component: QuantitypopoverPage;
  let fixture: ComponentFixture<QuantitypopoverPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuantitypopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
