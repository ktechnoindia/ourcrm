import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddVendorPage implements OnInit {
  selectTabs='address';

  cname:string='';
  vendorcode:number | null = null;
  gstin:number | null = null;
  selectedOption: string = '';
  openingbalance:number | null = null;
  closingbalance:number | null = null;
  phone:number | null = null;
  whatshappnumber: number | null = null; 
  email:string='';
  pincode:number | null = null;
  fullname:string='';
  taxnumber:number | null = null;
  adharnumber:number | null = null;
  panumber:number | null = null;
  udayognumber:number | null = null;
  accountnumber:number | null = null;
  ifsc:number | null = null;
  bankname:string='';
  branchname:string='';
  creditperiod:number | null = null;
  creditlimit:number | null = null;
  cardnumber:number | null = null;
  openingpoint:number | null = null;
  closingpoint:number | null = null;

  submitValue=false;

  constructor(private router: Router,private toastCtrl:ToastController) { }


  async onSubmit(form: NgForm) {
    if(this.cname === ""){
     const toast = await this.toastCtrl.create({
       message:"Name is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.vendorcode === null){
     const toast = await this.toastCtrl.create({
       message:"Vendor code is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.gstin === null){
     const toast = await this.toastCtrl.create({
       message:"GSTIN is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.selectedOption === ''){
     const toast = await this.toastCtrl.create({
       message:"Select Group Name is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.openingbalance === null){
     const toast = await this.toastCtrl.create({
       message:"Opening Balance is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.closingbalance === null){
     const toast = await this.toastCtrl.create({
       message:"Closing Balance is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.phone === null){
     const toast = await this.toastCtrl.create({
       message:"Phone Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.whatshappnumber === null){
     const toast = await this.toastCtrl.create({
       message:"Whatshapp Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.email === ''){
     const toast = await this.toastCtrl.create({
       message:"Email is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.pincode === null){
     const toast = await this.toastCtrl.create({
       message:"Pin Code is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.fullname === ''){
     const toast = await this.toastCtrl.create({
       message:"Full Name is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.taxnumber === null){
     const toast = await this.toastCtrl.create({
       message:"Tax Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.adharnumber === null){
     const toast = await this.toastCtrl.create({
       message:"Adhar Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.panumber === null){
     const toast = await this.toastCtrl.create({
       message:"PAN Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.udayognumber === null){
     const toast = await this.toastCtrl.create({
       message:"Udyog Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.accountnumber === null){
     const toast = await this.toastCtrl.create({
       message:"Account Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.ifsc === null){
     const toast = await this.toastCtrl.create({
       message:"IFSC Code is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.bankname === ''){
     const toast = await this.toastCtrl.create({
       message:"Bank Name is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.branchname === ''){
     const toast = await this.toastCtrl.create({
       message:"Branch Name is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.creditperiod === null){
     const toast = await this.toastCtrl.create({
       message:"Credit Period is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.creditlimit === null){
     const toast = await this.toastCtrl.create({
       message:"Credit Limit is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.cardnumber === null){
     const toast = await this.toastCtrl.create({
       message:"Card Number is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.openingpoint === null){
     const toast = await this.toastCtrl.create({
       message:"Opening Point is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else if(this.closingpoint === null){
     const toast = await this.toastCtrl.create({
       message:"Closing Point is required",
       duration:3000,
       color:'danger'
     });
     toast.present()
    }else{
     const toast = await this.toastCtrl.create({
       message: "Successfully !",
       duration: 3000,
       color:'success'
     });
      toast.present();
      this.submitValue=true
   }
   }


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
}
