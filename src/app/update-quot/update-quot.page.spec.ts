import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateQuotPage } from './update-quot.page';

describe('UpdateQuotPage', () => {
  let component: UpdateQuotPage;
  let fixture: ComponentFixture<UpdateQuotPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateQuotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
