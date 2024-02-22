import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewledgergroupPage } from './viewledgergroup.page';

describe('ViewledgergroupPage', () => {
  let component: ViewledgergroupPage;
  let fixture: ComponentFixture<ViewledgergroupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewledgergroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
