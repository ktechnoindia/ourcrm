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
// import { Subscription } from 'rxjs';


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
  // myservice: Subscription = new Subscription;


  constructor(private alertController: AlertController,public session:SessionService,private companyService : CreatecompanyService ,private router:Router,private toastCtrl:ToastController,private encService:EncryptionService) { 
    const compid='1';
    this.companys$ = this.companyService.fetchallcompany(compid,'','');
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

  ngOnInit() {
  }

goBack(){
  this.router.navigate(["/createcompany"])
}
}
