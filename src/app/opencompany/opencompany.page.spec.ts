import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpencompanyPage } from './opencompany.page';

describe('OpencompanyPage', () => {
  let component: OpencompanyPage;
  let fixture: ComponentFixture<OpencompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OpencompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
