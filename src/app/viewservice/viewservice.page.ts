import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { AddserviceService } from '../services/addservice.service';

@Component({
  selector: 'app-viewservice',
  templateUrl: './viewservice.page.html',
  styleUrls: ['./viewservice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewservicePage implements OnInit {
  formDate:string='';
  toDate:string='';
  services$: Observable<any[]> 
  searchTerm: string = '';
  filteredServices$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private addService : AddserviceService ,private router:Router,private toastCtrl:ToastController,private encService:EncryptionService) { 
    const compid='1';
    this.services$ = this.addService.fetchallservice(compid,'','');
    console.log(this.services$);
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

  filterCustomers(): Observable<any[]> {
    return this.services$.pipe(
      map(serviecs =>
        serviecs.filter(service =>
          Object.values(service).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredServices$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredServices$ = this.services$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }


goBack(){
  this.router.navigate(["/add-service"])
}
}

