import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewitemPage } from './viewitem.page';

describe('ViewitemPage', () => {
  let component: ViewitemPage;
  let fixture: ComponentFixture<ViewitemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
