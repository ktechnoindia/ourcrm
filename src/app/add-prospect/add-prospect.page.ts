import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.page.html',
  styleUrls: ['./add-prospect.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddProspectPage implements OnInit {
  fullName:string='';
  companyName:string='';
  phoneNumber:number | null = null;
  email:string='';
  country:string='';
  state:string='';
  city:string='';
  pinCode:number | null = null;
  fullAddress:string='';
  companySize:number | null = null;
  industryType:string='';
  website:string='';
  revenue:number | null = null;
  followDate:number | null = null;
  leadStatus:string='';
  leadScore:string='';
  leadOwner:string='';
  fileUpload:any='';

  submitValue= false;
  constructor(private router: Router,private toastCtrl:ToastController) { }

  async onSubmit(){
if(this.fullName===''){
  const toast = await this.toastCtrl.create({
    message:"FullNmae is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.companyName===''){
  const  toast = await this.toastCtrl.create({
    message:"Company Name is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.phoneNumber==null){
  const toast = await this.toastCtrl.create({
    message:"Phone Number is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.email===''){
  const toast = await this.toastCtrl.create({
    message:"Email is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.country===''){
  const toast = await this.toastCtrl.create({
    message:"Country is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.state===''){
  const toast = await this.toastCtrl.create({
    message:"State is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.city===''){
  const toast = await this.toastCtrl.create({
    message:"City is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.pinCode===null){
  const toast = await this.toastCtrl.create({
    message:"Pin Code is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.fullAddress===''){
  const toast = await this.toastCtrl.create({
    message:"Full Address is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.companySize===null){
  const toast = await this.toastCtrl.create({
    message:"Company Size is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.industryType===''){
  const toast = await this.toastCtrl.create({
    message:"Industry Type is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.website===''){
  const toast = await this.toastCtrl.create({
    message:"Website is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.revenue===null){
  const toast = await this.toastCtrl.create({
    message:"Revenue is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.followDate===null){
  const toast = await this.toastCtrl.create({
    message:"Follow Date is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.leadStatus===''){
  const toast = await this.toastCtrl.create({
    message:"Lead Status is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.leadScore===''){
  const toast = await this.toastCtrl.create({
    message:"Lead Score is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.leadOwner===''){
  const toast = await this.toastCtrl.create({
    message:"Lead Owner is required",
    duration:3000,
    color:'danger'
  });
  toast.present();
}else if(this.fileUpload===''){
  const toast = await this.toastCtrl.create({
    message:"Upload File is required",
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
  toast.present();
  this.submitValue=true;
}
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
}
