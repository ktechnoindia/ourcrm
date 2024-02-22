import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LedgergroupPage } from './ledgergroup.page';

describe('LedgergroupPage', () => {
  let component: LedgergroupPage;
  let fixture: ComponentFixture<LedgergroupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LedgergroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
