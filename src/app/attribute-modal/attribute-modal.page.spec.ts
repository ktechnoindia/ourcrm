import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeModalPage } from './attribute-modal.page';

describe('AttributeModalPage', () => {
  let component: AttributeModalPage;
  let fixture: ComponentFixture<AttributeModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttributeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
