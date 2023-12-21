import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutstandingreportPage } from './outstandingreport.page';

describe('OutstandingreportPage', () => {
  let component: OutstandingreportPage;
  let fixture: ComponentFixture<OutstandingreportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OutstandingreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
