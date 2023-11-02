// add-customer.module.ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCustomerPage } from './add-customer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AddCustomerPage],
  imports: [IonicPageModule.forChild(AddCustomerPage),Ng2SearchPipeModule],
})
export class AddCustomerPageModule {}
