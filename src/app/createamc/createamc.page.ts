import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-createamc',
  templateUrl: './createamc.page.html',
  styleUrls: ['./createamc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CreateamcPage implements OnInit {
  contract:string='';
  cname:string='';
  startdate:string='';
  endate:string='';
  contractduration:string='';  
  cover:string='';
  list:string='';
  contractvalue:string='';
  servicelevel:string='';
  listsla:string='';

  constructor(private router: Router,private toastCtrl:ToastController) { }

  async onSubmit() {
    if (this.contract === '') {
      const toast = await this.toastCtrl.create({
        message: "Contract is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.cname === '') {
      const toast = await this.toastCtrl.create({
        message: "Name is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.startdate === '') {
      const toast = await this.toastCtrl.create({
        message: "Start Date is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.endate === '') {
      const toast = await this.toastCtrl.create({
        message: "End Date is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.contractduration === '') {
      const toast = await this.toastCtrl.create({
        message: "Contract Duration is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.cover === '') {
      const toast = await this.toastCtrl.create({
        message: "Cover is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.list === '') {
      const toast = await this.toastCtrl.create({
        message: "List is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.contractvalue === '') {
      const toast = await this.toastCtrl.create({
        message: "Contrat Value is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.servicelevel === '') {
      const toast = await this.toastCtrl.create({
        message: "Service Level is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if (this.listsla === '') {
      const toast = await this.toastCtrl.create({
        message: "List SLA is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message: "Successfully",
        duration: 3000,
        color: 'success'
      });
      toast.present();
    }
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/amc-manager']); // Navigate back to the previous page
  }

}
