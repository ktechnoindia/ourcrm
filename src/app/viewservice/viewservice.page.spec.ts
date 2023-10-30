import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewservicePage } from './viewservice.page';

describe('ViewservicePage', () => {
  let component: ViewservicePage;
  let fixture: ComponentFixture<ViewservicePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
