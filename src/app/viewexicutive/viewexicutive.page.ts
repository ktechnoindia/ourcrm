import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExecutiveService } from '../services/executive.service';
import { EncryptionService } from '../services/encryption.service';


@Component({
  selector: 'app-viewexicutive',
  templateUrl: './viewexicutive.page.html',
  styleUrls: ['./viewexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewexicutivePage implements OnInit {
  formDate:string='';
  toDate:string='';
  executives$: Observable<any[]>
  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private executService:ExecutiveService) { 
    const compid='1';

    this.executives$ = this.executService.fetchAllExecutive(encService.encrypt(compid),'','');
    console.log(this.executives$);
  }

   onSubmit(){
    // if(this.formDate===''){
    //   const toast = await this.toastCtrl.create({
    //     message:"Form Date is required",
    //     duration:3000,
    //     color:'danger',
    //   });
    //   toast.present();
    // }else if(this.toDate===''){
    //   const toast = await this.toastCtrl.create({
    //     message:"To Date is required",
    //     duration:3000,
    //     color:'danger',
    //   });
    //   toast.present();
    // }else{
    //   const toast = await this.toastCtrl.create({
    //     message:"Successfully !",
    //     duration:3000,
    //     color:'success',
    //   });
    //   toast.present();
    // }
  }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/addexecutive"])
}
}
