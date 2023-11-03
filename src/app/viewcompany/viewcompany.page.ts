import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, concatMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { CreatecompanyService } from '../services/createcompany.service';
import { NavigationExtras } from '@angular/router';
import { SessionService } from '../services/session.service';
import { formatDate } from '@angular/common'; 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.page.html',
  styleUrls: ['./viewcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewcompanyPage implements OnInit {

  formDate:string='';
  toDate:string='';
  companys$: Observable<any[]>
  myservice: Subscription = new Subscription;
  myaction: any;


  constructor(private alertController: AlertController,public session:SessionService,private createcompany : CreatecompanyService ,private router:Router,private toastCtrl:ToastController,private encService:EncryptionService) { 
    const compid='1';
    this.companys$ = this.createcompany.fetchallCompany(encService.encrypt(compid),'','');
    console.log(this.companys$);
  }

  async onSubmit(){
  
  }

  ///edit company start
  editcompany(company:any){
    console.log(company);
    let navigationExtras: NavigationExtras = {
      state: {
        company: company,
        edit:true
      }
    };
    this.router.navigate(['createcompany'], navigationExtras);

  }
  async openToast(msg:string) {  
    this.session.openToast(msg); 
   }  

  //edit company end

  //delete company start

  // async delcomp(id:number){ 
  //   const userid =await this.session.getValue('userid');
  //     const keys = formatDate(new Date(), 'yMMddHH', 'en-IN'); 
  //  this.myservice=   this.createcompany.deleteCompany(id+'',keys,userid).subscribe((response:any)=>{
  //      if(response.status) {
  //       this.openToast('Company Removed');
  //       this.myaction();
  //      }
  //   }, (error: { message: string; }) => {                              //Error callback
  //     console.log('error caught in component'+error.message) 
  //   });  
  // }


  // async presentConfirmAlert(id:number) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Action',
  //     message: 'Do you want to Delete?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           // Handle cancel action
  //           this.openToast('canceled');
  //         },
  //       },
  //       {
  //         text: 'Continue',
  //         handler: () => {
  //           this.delcomp(id);
  //           // Handle continue action
  //           // Put your code here to perform the action when the user chooses to continue.
  //         },
  //       },
  //     ],
  //   });
  
  //   await alert.present();
  // }


  ngOnInit() {
  }


  
goBack(){
  this.router.navigate(["/createcompany"])
}
}
