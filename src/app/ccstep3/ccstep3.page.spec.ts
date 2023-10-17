import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ccstep3Page } from './ccstep3.page';

describe('Ccstep3Page', () => {
  let component: Ccstep3Page;
  let fixture: ComponentFixture<Ccstep3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ccstep3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
