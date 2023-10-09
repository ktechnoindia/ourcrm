import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsereditPage } from './useredit.page';

describe('UsereditPage', () => {
  let component: UsereditPage;
  let fixture: ComponentFixture<UsereditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsereditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
