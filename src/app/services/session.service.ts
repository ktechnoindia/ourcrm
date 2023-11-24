import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  openAlerth(arg0: string, custname: number) {
    throw new Error('Method not implemented.');
  }
  openToast(msg: string) {
    throw new Error('Method not implemented.');
  }
  getValue(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(public toastCtrl:ToastController,) { }
}

// async openToast(msg:string) {  
//   const toast = await this.toastCtrl.create({  
//     message: msg,  
//     color:'danger',
//     duration: environment.toasttiming   
//   });  
//   toast.present();  
