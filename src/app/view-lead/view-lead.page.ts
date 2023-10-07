import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.page.html',
  styleUrls: ['./view-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewLeadPage implements OnInit {

  companyName: string = '';
  cName: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private router: Router, private toastCtrl: ToastController) { }

  async onSubmit() {
    if (this.companyName === '') {
      const toast = await this.toastCtrl.create({
        message: "Company Name is Required",
        duration:3000,
        color:'danger'
      });
      toast.present();
    }else if(this.cName===''){
      const toast = await this.toastCtrl.create({
        message:"Customer Name is required",
        duration:3000,
        color:'danger'
      });
      toast.present();
    }else if(this.fromDate===''){
      const toast = await this.toastCtrl.create({
        message:"From Date is required",
        duration:3000,
        color:'danger'
      });
      toast.present();
    }else if(this.toDate===''){
      const toast = await this.toastCtrl.create({
        message:"To Date is required",
        duration:3000,
        color:'danger'
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message:"Successfully !",
        duration:3000,
        color:'success'
      });
      toast.present()
    }
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/lead-manager"])
  }

}
