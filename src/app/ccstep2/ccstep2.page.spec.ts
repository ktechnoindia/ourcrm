import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ccstep2Page } from './ccstep2.page';

describe('Ccstep2Page', () => {
  let component: Ccstep2Page;
  let fixture: ComponentFixture<Ccstep2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ccstep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
