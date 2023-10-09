import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatecompanyPage } from './createcompany.page';

describe('CreatecompanyPage', () => {
  let component: CreatecompanyPage;
  let fixture: ComponentFixture<CreatecompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatecompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
