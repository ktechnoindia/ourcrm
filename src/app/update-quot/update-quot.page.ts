import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-quot',
  templateUrl: './update-quot.page.html',
  styleUrls: ['./update-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdateQuotPage implements OnInit {
  quoteNumber: number | null = null;
  quateDate: string = '';
  quoteGroup: string = '';
  quateTax: number | null = null;
  constructor(private router:Router,private toastCtrl:ToastController) { }

  async onSubmit() {
    if (this.quoteNumber === null) {
      const toast = await this.toastCtrl.create({
        message: "Quatation Number is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.quateDate===''){
      const toast = await this.toastCtrl.create({
        message: "Quatation Date is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.quoteGroup===''){
      const toast = await this.toastCtrl.create({
        message: "Quatation Group is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.quateTax===null){
      const toast = await this.toastCtrl.create({
        message: "Quatation Tax is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message: "Successfully !",
        duration: 3000,
        color: 'success'
      });
      toast.present();
    }
  }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/quote-manager"])
}
}
