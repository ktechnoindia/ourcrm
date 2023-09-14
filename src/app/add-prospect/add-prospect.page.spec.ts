import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProspectPage } from './add-prospect.page';

describe('AddProspectPage', () => {
  let component: AddProspectPage;
  let fixture: ComponentFixture<AddProspectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddProspectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
