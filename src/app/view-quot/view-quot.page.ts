import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { QuotationService } from '../services/quotation.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-view-quot',
  templateUrl: './view-quot.page.html',
  styleUrls: ['./view-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewQuotPage implements OnInit {

  formDate:string='';
  toDate:string='';
  quote$: Observable<any[]>
  constructor( private encService: EncryptionService, private quoteservice: QuotationService,private router:Router,private toastCtrl:ToastController) { 
    const compid = '1';

    this.quote$ = this.quoteservice.fetchallQuote(encService.encrypt(compid), '', '');
    console.log(this.quote$);

    this.quote$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
  }

  async onSubmit(){
    if(this.formDate===''){
      const toast = await this.toastCtrl.create({
        message:"Form Date is required",
        duration:3000,
        color:'danger'
      });
      toast.present();
    }else if(this.toDate===''){
      const toast = await this.toastCtrl.create({
        message:"To Date is required",
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
    }
  }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/add-quote"])
  }


  deleteRow(index: number): void {
    this.quote$.subscribe(data => {
      // Assuming quote$ is an array inside the Observable, remove the item at the specified index
      this.quote$ = new Observable(observer => {
        observer.next(data.filter((_, i) => i !== index));
        observer.complete();
      });
    });
  }
}
