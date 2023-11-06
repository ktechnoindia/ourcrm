import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExecutiveService } from '../services/executive.service';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.page.html',
  styleUrls: ['./view-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,RouterLink]
})
export class ViewLeadPage implements OnInit {

  select_sales_person:number=0;
  executive$: any;
  executive: string='';
  fromDate: string = '';
  toDate: string = '';

  constructor(private execut: ExecutiveService,private router: Router, private toastCtrl: ToastController) {
    this.executive$ = this.execut.getexecutive();

   }

  async onSubmit() {
   if(this.executive$===''){
      const toast = await this.toastCtrl.create({
        message:"Executive  Name is required",
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
