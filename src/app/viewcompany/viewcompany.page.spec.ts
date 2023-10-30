import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewcompanyPage } from './viewcompany.page';

describe('ViewcompanyPage', () => {
  let component: ViewcompanyPage;
  let fixture: ComponentFixture<ViewcompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewcompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
