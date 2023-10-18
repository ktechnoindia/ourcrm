import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateunitPage } from './createunit.page';

describe('CreateunitPage', () => {
  let component: CreateunitPage;
  let fixture: ComponentFixture<CreateunitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateunitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
