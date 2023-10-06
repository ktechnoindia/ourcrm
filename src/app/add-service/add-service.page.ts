import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddServicePage implements OnInit {
  serviceCode:number | null= null;
  selectOption1:string='';
  selectOption2:string='';
  selectOption3:string='';
  itemDesc:string='';

  constructor(private router: Router,private toastCtrl:ToastController) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
 async onService(){
      if(this.serviceCode === null){
        const toast = await this.toastCtrl.create({
          message:"Service Code is required",
          duration:3000,
          color:'danger'
        });
        toast.present()
      }else if(this.selectOption1===""){
        const toast = await this.toastCtrl.create({
          message:"Stock is required",
          duration:3000,
          color:'danger'
        });
        toast.present()
      }else if(this.selectOption2===""){
        const toast = await this.toastCtrl.create({
          message:"Sdd is required",
          duration:3000,
          color:'danger'
        });
        toast.present()
      }else if(this.itemDesc===''){
        const toast = await this.toastCtrl.create({
          message:"Item Description is required",
          duration:3000,
          color:'danger'
        });
        toast.present()
      }else if(this.selectOption3===""){
        const toast = await this.toastCtrl.create({
          message:"Stk is required",
          duration:3000,
          color:'danger'
        });
        toast.present()
      }else{
        const toast = await this.toastCtrl.create({
          message:"Successfully !",
          duration:3000,
          color:'success'
        });
        toast.present()
        
      }
  }

}
