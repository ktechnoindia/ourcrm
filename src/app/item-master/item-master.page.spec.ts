import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemMasterPage } from './item-master.page';

describe('ItemMasterPage', () => {
  let component: ItemMasterPage;
  let fixture: ComponentFixture<ItemMasterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
