import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { AdditemService } from '../services/additem.service';
@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.page.html',
  styleUrls: ['./viewitem.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewitemPage implements OnInit {
  formDate:string='';
  toDate:string='';
  items$: Observable<any[]>

  constructor(private additem : AdditemService ,private router:Router,private toastCtrl:ToastController,private encService:EncryptionService) { 
    const compid='1';
    this.items$ = this.additem.fetchallItem(encService.encrypt(compid),'','');
    console.log(this.items$);


    this.items$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
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
  this.router.navigate(["/add-item"])
}
}
