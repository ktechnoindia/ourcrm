import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { CustomertypeService } from '../services/customertype.service';
import { ExecutiveService } from '../services/executive.service';
import { LegderService, ledg } from '../services/legder.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,RouterLink,HttpClientModule, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LedgerPage implements OnInit {

  
  selectTabs = 'address';
  activeSegment: string = '';
  selectedPage: string = 'page1';
  selectedState: any;
  selectedDistrict: string='';

  lname: string = '';
  lcode: number | null = null;
  ledger_code:string='';
  selectedOption: string = '';
  opening_balance: number | null = null;
  closing_balance: number | null = null;
  mobile: number | null = null;
  whatsapp_number:string='';
  address: string = '';
  gstin:string='';
  email:string='';
  select_sales_person:string='';
  pincode:number | null=null;
  // tdn: number | null = null;
  // aadhar_no: number | null = null;
  // pan_no: number | null = null;
  // udhyog_aadhar: number | null = null;
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
  lgroup_name:string='';

  selectedCountry: string='';
 

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
  myform: FormGroup;
form:any;

  // constructor(private router: Router,
  //   private toastCtrl: ToastController,
  //   private myService: MyService

  constructor(private toastController:ToastController,private https:HttpClient,private formBuilder: FormBuilder,private custtp: CustomertypeService, private execut: ExecutiveService, private ledger: LegderService, private router: Router, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService) {
    this.myform = this.formBuilder.group({
      lname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      ledger_code: ['', [Validators.required, Validators.maxLength(5)]],
      gstin: ['', [Validators.required, Validators.maxLength(15)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      lgroup_name:['',[Validators.required]],
      opening_balance:[''],
      closing_balance:[''],
      whatsapp_number:[''],
      country:[''],
      state:[''],
      district:[''],
      pincode:[''],
      address:[''],
      // tdn:[''],
      // aadhar_no:[''],
      // pan_no:[''],
      // udhyog_aadhar:[''],
      account_number:[''],
      ifsc_code:[''],
      bank_name:[''],
      branch_name:[''],
      // credit_period:[''],
      // credit_limit:[''],
      select_sales_person:[''],
      card_number:[''],
      opening_point:[''],
      closing_point:[''],
      selectedSalutation:[''],
      companyName:[''],
      country1:[''],
      state1:[''],
      district1:[''],
      pincode1:[''],
      address1:[''],
      selectedOption:[''],
      selectedState:[''],
      selectedDistrict:[''],
      selectedOption1:[''],
      selectedState1:[''],
      selectedDistrict1:[''],
      
    });
    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.custtype$ = this.custtp.getcustomertype();
    this.executive$ = this.execut.getexecutive();

  }
  ngOnInit() {
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

  

  goBack() {
    this.router.navigate(['/master']);
  }

  onSubmit() {
    
    console.log('Your form data : ', this.myform.value);
    let ledgerdata:ledg={lname:this.myform.value.lname,ledger_code:this.myform.value.ledger_code,gstin:this.myform.value.gstin,lgroup_name:this.myform.value.lgroup_name,opening_balance:this.myform.value.opening_balance,closing_balance:this.myform.value.closing_balance,mobile:this.myform.value.mobile,whatsapp_number:this.myform.value.whatsapp_number,email:this.myform.value.email,country:this.myform.value.country,state:this.myform.value.state,district:this.myform.value.district,pincode:this.myform.value.pincode,address:this.myform.value.address,account_number:this.myform.value.account_number,ifsc_code:this.myform.value.ifsc_code,bank_name:this.myform.value.bank_name,branch_name:this.myform.value.branch_name,select_sales_person:this.myform.value.select_sales_person,card_number:this.myform.value.card_number,opening_point:this.myform.value.opening_point,closing_point:this.myform.value.closing_point,selectedSalutation:this.myform.value.selectedSalutation,companyName:this.myform.value.companyName,country1:this.myform.value.country1,state1:this.myform.value.state1,district1:this.myform.value.district1,pincode1:this.myform.value.pincode1,address1:this.myform.value.address1};
    this.ledger.createLdeger(ledgerdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  
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

