import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingamcPage } from './pendingamc.page';

describe('PendingamcPage', () => {
  let component: PendingamcPage;
  let fixture: ComponentFixture<PendingamcPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PendingamcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
