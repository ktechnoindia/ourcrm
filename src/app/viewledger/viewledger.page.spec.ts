import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewledgerPage } from './viewledger.page';

describe('ViewledgerPage', () => {
  let component: ViewledgerPage;
  let fixture: ComponentFixture<ViewledgerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewledgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
