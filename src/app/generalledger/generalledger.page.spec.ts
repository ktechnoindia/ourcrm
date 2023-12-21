import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralledgerPage } from './generalledger.page';

describe('GeneralledgerPage', () => {
  let component: GeneralledgerPage;
  let fixture: ComponentFixture<GeneralledgerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneralledgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
