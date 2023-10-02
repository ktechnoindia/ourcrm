import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateamcPage } from './createamc.page';

describe('CreateamcPage', () => {
  let component: CreateamcPage;
  let fixture: ComponentFixture<CreateamcPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateamcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
