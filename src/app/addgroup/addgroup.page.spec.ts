import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddgroupPage } from './addgroup.page';

describe('AddgroupPage', () => {
  let component: AddgroupPage;
  let fixture: ComponentFixture<AddgroupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
