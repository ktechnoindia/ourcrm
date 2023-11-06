import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { CustomerService, cust } from '../services/customer.service';
import { CustomertypeService } from '../services/customertype.service';
import { ExecutiveService } from '../services/executive.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,RouterLink, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCustomerPage implements OnInit {
  selectedSalutation: string='';
  companyName: string='';
  
  selectTabs = 'address';
  activeSegment: string = '';
  selectedPage: string = 'page1';
  selectedState: any;
  selectedDistrict: string='';

  name: string = '';
  customercode: number | null = null;
  customer_code:string='';
  selectedOption: string = '';
  opening_balance: number | null = null;
  closing_balance: number | null = null;
  mobile: number | null = null;
  whatsapp_number:string='';
  address: string = '';
  gstin:string='';
  email:string='';
  select_sales_person:string='';
  pincode:string='';
  tdn: number | null = null;
  aadhar_no: number | null = null;
  pan_no: number | null = null;
  udhyog_aadhar: number | null = null;
  account_number: string="";
  ifsc_code: number | null = null;
  bank_name: string = '';
  branch_name: string = '';
  credit_period: number | null = null;
  credit_limit: number | null = null;
  card_number: number | null = null;
  opening_point: number | null = null;
  closing_point: number | null = null;
  district:any;
  country:any;
  state:any;
  select_group:string='';


  selectedOption1:string='';
selectedState1:string='';
selectedDistrict1:string='';
pincode1:string='';
address1:string='';

  submitValue = false;
  // selectedOption:string='';
  //countries: any[] = [];
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  menuController: any;
  custtype$: any;
  custtype!: string;
  executive$: any;
  executive!: string;

  // constructor(private router: Router,
  //   private toastCtrl: ToastController,
  //   private myService: MyService


  constructor(private custtp: CustomertypeService, private execut: ExecutiveService, private myService: CustomerService, private router: Router, private toastCtrl: ToastController, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService) {
    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.custtype$ = this.custtp.getcustomertype();
    this.executive$ = this.execut.getexecutive();

  }
  onCountryChange() {
    console.log('selected value' + this.selectedOption);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.selectedState);
    this.districts$ = this.districtservice.getDistricts(this.selectedState);
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

  }

  segmentChanged(event: any) {
    const selectedValue = event.detail.value;

    console.log('Selected Segment Value:', selectedValue);
  }

  goBack() {
    this.router.navigate(['/master']);
  }

  onSubmit(myform: NgForm) {
    
    console.log('Your form data : ', myform.value);
    let custdata:cust={name:myform.value.name,customer_code:myform.value.customer_code,gstin:myform.value.gstin,select_group:myform.value.select_group,opening_balance:myform.value.opening_balance,closing_balance:myform.value.closing_balance,mobile:myform.value.mobile,whatsapp_number:myform.value.whatsapp_number,email:myform.value.email,country:myform.value.country,state:myform.value.state,district:myform.value.district,pincode:myform.value.pincode,address:myform.value.address,tdn:myform.value.tdn,aadhar_no:myform.value.aadhar_no,pan_no:myform.value.pan_no,udhyog_aadhar:myform.value.udhyog_aadhar,account_number:myform.value.account_number,ifsc_code:myform.value.ifsc_code,bank_name:myform.value.bank_name,branch_name:myform.value.branch_name,credit_period:myform.value.credit_period,credit_limit:myform.value.credit_limit,select_sales_person:myform.value.select_sales_person,card_number:myform.value.card_number,opening_point:myform.value.opening_point,closing_point:myform.value.closing_point,selectedSalutation:myform.value.selectedSalutation,companyName:myform.value.companyName,country1:myform.value.country1,state1:myform.value.state1,district1:myform.value.district1,pincode1:myform.value.pincode1,address1:myform.value.address1};
    this.myService.createCustomer(custdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
    console.log('Form submitted with data:', {
      salutation: this.selectedSalutation,
      companyName: this.companyName,
    });
  }


  // async onSubmit(form: NgForm) {
  //  if(this.cname === ""){
  //   const toast = await this.toastCtrl.create({
  //     message:"Name is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.customercode === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Customer code is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.gstin === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"GSTIN is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.selectedOption === ''){
  //   const toast = await this.toastCtrl.create({
  //     message:"Select Group Name is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.openingbalance === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Opening Balance is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.closingbalance === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Closing Balance is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.phone === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Phone Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.whatshappnumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Whatshapp Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.email === ''){
  //   const toast = await this.toastCtrl.create({
  //     message:"Email is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.pincode === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Pin Code is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.fullname === ''){
  //   const toast = await this.toastCtrl.create({
  //     message:"Full Name is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.taxnumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Tax Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.adharnumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Adhar Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.panumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"PAN Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.udayognumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Udyog Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.accountnumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Account Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.ifsc === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"IFSC Code is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.bankname === ''){
  //   const toast = await this.toastCtrl.create({
  //     message:"Bank Name is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.branchname === ''){
  //   const toast = await this.toastCtrl.create({
  //     message:"Branch Name is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.creditperiod === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Credit Period is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.creditlimit === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Credit Limit is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.cardnumber === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Card Number is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.openingpoint === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Opening Point is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else if(this.closingpoint === null){
  //   const toast = await this.toastCtrl.create({
  //     message:"Closing Point is required",
  //     duration:3000,
  //     color:'danger'
  //   });
  //   toast.present()
  //  }else{
  //   const toast = await this.toastCtrl.create({
  //     message: "Successfully !",
  //     duration: 3000,
  //     color:'success'
  //   });
  //    toast.present();
  //    this.submitValue=true
  // }
  // }

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
