import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesreturnPage } from './salesreturn.page';

describe('SalesreturnPage', () => {
  let component: SalesreturnPage;
  let fixture: ComponentFixture<SalesreturnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalesreturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
