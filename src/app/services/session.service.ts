import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@ionic-native/device/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  name: string = "";
  osVersion: string = "";
  uuid: string = "";
  platforms: string = "";

  constructor(private platform: Platform, private device: Device,private storage: Storage,public toastCtrl:ToastController, private alertController: AlertController,private router:Router,private httpclient:HttpClient){
     console.log('session constructor ');
    this.platform.ready().then(() => {
      //console.log('device ready '+this.device.version);
       this.osVersion = this.device.version;
       this.uuid = this.device.uuid;
       //this.name = (window as any).device.name;
       this.platforms = device.platform;

      
    });
    this.chkSessionAndsub();
 }
 

  //  getSValue(key:string){
  //  // console.log(this.osVersion+ ' hiiiiii '+this.uuid+' >  '+this.getCurrentPlatform())

  //  return  this.isAndroidOrios()? sessionStorage.getItem(key):'';
  // }
  // setSValue(key:string,val:string){
  //   sessionStorage.setItem(key,val);
  // }

  getUUID(){
    return this.uuid;
  }

  getplateform(){
    return this.platform;
  }
  getValue(key:string){
  //  console.log(this.osVersion+ ' hiiiiii '+this.uuid+' >  '+this.getCurrentPlatform())
   return  this.isAndroidOrios()?this.storage.get(key):sessionStorage.getItem(key);
  }
  setValue(key:string,val:string){
    this.isAndroidOrios()? this.storage.set(key,val):sessionStorage.setItem(key,val);
  }

  chkSessionAndsub(){
    if(this.getValue('sub')?.valueOf()!=null && this.getValue('sub')?.valueOf()=='E')
    this.router.navigate(['/subscription']); 
   // if()
  }

  getCurrentPlatform() {
    if (this.platform.is("desktop")) {
      return 'Web';
    } else if (this.platform.is('ios')) {
      return 'iOS';
    } else if (this.platform.is('android')) {
      return 'Android';
    }else if (this.platform.is('mobileweb')) {
      return 'MobileWeb';
    }else if (this.platform.is('ipad')) {
      return 'Ipad';
    } else if (this.platform.is('tablet')) {
      return 'Tablet';
    }else {
     return 'Unknown Platform';
    }
  }
  isAndroidOrios(){
    return (this.getCurrentPlatform() === "Android" || this.getCurrentPlatform() === "iOS");
  }

  getlang(pCode:string ,key:string,user:string){
    const body = { pcode: pCode };
    return this.httpclient.post(environment.apibaseurl+'i18n/'+environment.getlang,body,{headers:{'key':key,'user':user}})
  }

 async openAlert(msg:string){
  const alert = await this.alertController.create({
    header: 'Connect',
    message: msg,
    
  });
   alert.present();
}
async openAlerth(msg:string,headr:string){
  const alert = await this.alertController.create({
    header: headr,
    message: msg,
    
  });
   alert.present();
}
async openToast(msg:string) {  
  const toast = await this.toastCtrl.create({  
    message: msg,  
    color:'danger',
    duration: environment.toasttiming   
  });  
  toast.present();  
}  

 async lang(){
  let val:any;
  const userid = this.getValue('userid')?.valueOf();
  const keys = formatDate(new Date(), 'yMMddHH', 'en-IN'); 
  if(this.getValue('lang')==null|| this.getValue('lang')=='undefined'|| this.getValue('lang')==''){
this.getlang('en.json',keys,'').subscribe((response:any)=>{
    val=JSON.stringify(response);
     this.setValue('lang',JSON.stringify(response));
    return response;
}, (error) => {                              //Error callback
  console.log('error caught in component'+error.message) 
});  
}else{
  //console.log('..in else.. '+val);

  return JSON.parse(await this.getValue('lang'));
}
}
}
