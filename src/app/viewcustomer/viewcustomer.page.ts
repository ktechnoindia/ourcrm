import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.page.html',
  styleUrls: ['./viewcustomer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  ]
})
export class ViewcustomerPage implements OnInit {
  formDate:string='';
  toDate:string='';
  customers$: Observable<any[]>

  searchText:string='';

  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private custservice:CustomerService) { 
    const compid='1';

    this.customers$ = this.custservice.fetchallCustomer(encService.encrypt(compid),'','');
    console.log(this.customers$);
  }

  async onSubmit(){
    if(this.formDate===''){
      const toast = await this.toastCtrl.create({
        message:"Form Date is required",
        duration:3000,
        color:'danger',
      });
      toast.present();
    }else if(this.toDate===''){
      const toast = await this.toastCtrl.create({
        message:"To Date is required",
        duration:3000,
        color:'danger',
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message:"Successfully !",
        duration:3000,
        color:'success',
      });
      toast.present();
    }
  }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/add-customer"])
}
}
