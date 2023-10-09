import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditinfoPage } from './editinfo.page';

describe('EditinfoPage', () => {
  let component: EditinfoPage;
  let fixture: ComponentFixture<EditinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
