import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddCustomerPage implements OnInit {
  selectTabs='address';
  activeSegment: string = '';
  selectedPage: string = 'page1';


  cname:string='';
  customercode:number | null = null;
  gstin:number | null = null;
  selectedOption: string = '';
  openingbalance:number | null = null;
  closingbalance:number | null = null;
  phone:number | null = null;
  whatshappnumber: number | null = null; 
  email:string='';
  pincode:number | null = null;
  fullname:string='';
  taxnumber:number | null = null;
  adharnumber:number | null = null;
  panumber:number | null = null;
  udayognumber:number | null = null;
  accountnumber:number | null = null;
  ifsc:number | null = null;
  bankname:string='';
  branchname:string='';
  creditperiod:number | null = null;
  creditlimit:number | null = null;
  cardnumber:number | null = null;
  openingpoint:number | null = null;
  closingpoint:number | null = null;

  submitValue=false;
  // selectedOption:string='';
  //countries: any[] = [];
    countries$:Observable<any[]>
  menuController: any;

  
  constructor(private router: Router,private toastCtrl: ToastController,private countryService: CountryService) {
    this.countries$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$=this.countryService.getCountries();
   }

  loadCountries() {
    // this.countryService.getCountries().subscribe(
    //   (data) => {
    //      console.log(data);

    //     if (Array.isArray(data)) {
    //       this.countries = data;
    //     } else {
    //       console.error('API did not return an array of countries.');
    //     }
       
    //   },
    //   (error) => {
    //     console.error('Error loading countries:', error);

    //     if (error instanceof HttpErrorResponse) {
    //       const errorMessage = 'HTTP Error occurred during the API request.';
    //       console.error(errorMessage);

    //       console.error('Status Code:', error.status);
    //     } else {
    //       console.error('Non-HTTP error occurred during the API request.');
    //     }
    //   }
    // );
  }

  ngOnInit() {
    this.loadCountries();
  }

  segmentChanged(event: any) {
    const selectedValue = event.detail.value;
  
    console.log('Selected Segment Value:', selectedValue);
  }

  
  goBack() {
    this.router.navigate(['/master']); 
  }

  async onSubmit(form: NgForm) {
   if(this.cname === ""){
    const toast = await this.toastCtrl.create({
      message:"Name is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.customercode === null){
    const toast = await this.toastCtrl.create({
      message:"Customer code is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.gstin === null){
    const toast = await this.toastCtrl.create({
      message:"GSTIN is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.selectedOption === ''){
    const toast = await this.toastCtrl.create({
      message:"Select Group Name is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.openingbalance === null){
    const toast = await this.toastCtrl.create({
      message:"Opening Balance is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.closingbalance === null){
    const toast = await this.toastCtrl.create({
      message:"Closing Balance is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.phone === null){
    const toast = await this.toastCtrl.create({
      message:"Phone Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.whatshappnumber === null){
    const toast = await this.toastCtrl.create({
      message:"Whatshapp Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.email === ''){
    const toast = await this.toastCtrl.create({
      message:"Email is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.pincode === null){
    const toast = await this.toastCtrl.create({
      message:"Pin Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.fullname === ''){
    const toast = await this.toastCtrl.create({
      message:"Full Name is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.taxnumber === null){
    const toast = await this.toastCtrl.create({
      message:"Tax Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.adharnumber === null){
    const toast = await this.toastCtrl.create({
      message:"Adhar Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.panumber === null){
    const toast = await this.toastCtrl.create({
      message:"PAN Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.udayognumber === null){
    const toast = await this.toastCtrl.create({
      message:"Udyog Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.accountnumber === null){
    const toast = await this.toastCtrl.create({
      message:"Account Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.ifsc === null){
    const toast = await this.toastCtrl.create({
      message:"IFSC Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.bankname === ''){
    const toast = await this.toastCtrl.create({
      message:"Bank Name is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.branchname === ''){
    const toast = await this.toastCtrl.create({
      message:"Branch Name is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.creditperiod === null){
    const toast = await this.toastCtrl.create({
      message:"Credit Period is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.creditlimit === null){
    const toast = await this.toastCtrl.create({
      message:"Credit Limit is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.cardnumber === null){
    const toast = await this.toastCtrl.create({
      message:"Card Number is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.openingpoint === null){
    const toast = await this.toastCtrl.create({
      message:"Opening Point is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else if(this.closingpoint === null){
    const toast = await this.toastCtrl.create({
      message:"Closing Point is required",
      duration:3000,
      color:'danger'
    });
    toast.present()
   }else{
    const toast = await this.toastCtrl.create({
      message: "Successfully !",
      duration: 3000,
      color:'success'
    });
     toast.present();
     this.submitValue=true
  }
  }

  toggleSegment(segment: string) {
    this.activeSegment = segment;
  }
  
  closeMenu() {
    this.menuController.close(); // Close the menu
  }
  limitInputLength($event: { target: { value: string | any[]; }; preventDefault: () => void; }, maxLength = 10) {
    if ($event.target.value.length >= maxLength) {
      $event.preventDefault();
      return;
    }
  }
  limitInputLength1($event: { target: { value: string | any[]; }; preventDefault: () => void; }, maxLength = 20) {
    if ($event.target.value.length >= maxLength) {
      $event.preventDefault();
      return;
    }
  }
  
}
