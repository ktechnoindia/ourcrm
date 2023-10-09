import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClosecompanyPage } from './closecompany.page';

describe('ClosecompanyPage', () => {
  let component: ClosecompanyPage;
  let fixture: ComponentFixture<ClosecompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClosecompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
