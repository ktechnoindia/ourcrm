import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemledgerPage } from './itemledger.page';

describe('ItemledgerPage', () => {
  let component: ItemledgerPage;
  let fixture: ComponentFixture<ItemledgerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemledgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
