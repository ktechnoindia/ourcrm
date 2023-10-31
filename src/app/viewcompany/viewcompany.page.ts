import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { CreatecompanyService } from '../services/createcompany.service';
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

  constructor(private createcomp : CreatecompanyService ,private router:Router,private toastCtrl:ToastController,private encService:EncryptionService) { 
    const compid='1';
    this.companys$ = this.createcomp.fetchallCompany(encService.encrypt(compid),'','');
    console.log(this.companys$);
  }

  async onSubmit(){
  
  }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/createcompany"])
}
}
