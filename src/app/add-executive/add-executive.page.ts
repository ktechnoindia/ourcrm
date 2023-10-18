import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';


@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.page.html',
  styleUrls: ['./add-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddExecutivePage implements OnInit {
  role: string = '';
  name: string = '';
  manager: string = '';
  phone: number | null = null;
  email: string = '';
  whatshappnumber: number | null = null;
  panumber: string = '';
  commission: string = '';
  ledger: string = '';
roletypes$:Observable<any[]>
MenuController: any;
  roletypesservice: any;

 
  constructor(private router: Router, private toastCtrl: ToastController,private roletypes:roletypesservice) { 
    this.roletypes$=this.roletypes.getroletypes();
  }
  
  async onSubmit() {
    if (this.role === '') {
      const toast = await this.toastCtrl.create({
        message: "Role is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.name === '') {
      const toast = await this.toastCtrl.create({
        message: "Name is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.manager === '') {
      const toast = await this.toastCtrl.create({
        message: "Manager is required",
        duration: 3000,
        color: 'danger'
      })
      toast.present();
    } else if (this.phone === null) {
      const toast = await this.toastCtrl.create({
        message: 'Phone Number is required',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.email === '') {
      const toast = await this.toastCtrl.create({
        message: 'Email is required',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.whatshappnumber === null) {
      const toast = await this.toastCtrl.create({
        message: 'Whatshapp Number is required',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.panumber === '') {
      const toast = await this.toastCtrl.create({
        message: 'PAN Number is required',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.commission === '') {
      const toast = await this.toastCtrl.create({
        message: 'Commission is required',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } else if (this.ledger === '') {
      const toast = await this.toastCtrl.create({
        message: 'Ledger is required',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message: 'SuccessFully !',
        duration: 3000,
        color: 'success'
      });
      toast.present();
    }
  }


  ngOnInit() {
  }
  navigateToVieweExecutivePage() {
    this.router.navigate(['/view-executive']); // Navigate to the target page
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }



}
