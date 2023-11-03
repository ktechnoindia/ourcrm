import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-viewsupplier',
  templateUrl: './viewsupplier.page.html',
  styleUrls: ['./viewsupplier.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    // Ng2SearchPipeModule
  ]
})
export class ViewsupplierPage implements OnInit {
  searchText:string='';

  formDate:string='';
  toDate:string='';
  vendors$: Observable<any[]>

  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private venderService:VendorService) { 
    const compid='1';

    this.vendors$ = this.venderService.fetchallVendor(encService.encrypt(compid),'','');
    console.log(this.vendors$);
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
  this.router.navigate(["/add-vendor"])
}
}
