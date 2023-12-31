import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Observable, from } from 'rxjs';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { LeadService ,leadstore } from '../services/lead.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { LeadsourceService } from '../services/leadsource.service';
import { FormValidationService } from '../form-validation.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';


@Component({
  selector: 'app-leadedit',
  templateUrl: './leadedit.page.html',
  styleUrls: ['./leadedit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,RouterModule]
})
export class LeadeditPage implements OnInit {
  form: FormGroup;
  submitted = false;

  catPerson:string='';
  companyname:string='';
  leaddate:string='';
  phone:string='';
  pncode:string='';
  fulladdress:string='';
  emails:string='';
  lscore:number=0;
  rmark:string='';
  selectpd:string='';
  executivename:number=0;
  selectedCountry:number=0;
  selectedState: number=0;
  selectedDistrict: number=0;
  leadtype:number=0;
  leadassign:number=0;

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  leadsourcetype$: any;
  leadsourcetype!: string;
  executive$: any;
  executive: string='';
  itemnames$: any;



  constructor(private execut: ExecutiveService,private itemService:AdditemService,private router:Router,private formBuilder: FormBuilder,private formService: FormValidationService,private leadSourceService:LeadsourceService, private leadmanage : LeadService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService
   ) {

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.leadsourcetype$ = this.leadSourceService.getleadsourcetype();
    this.executive$ = this.execut.getexecutive();
    this.leaddate= new Date().toLocaleDateString();
    this.itemnames$ = this.itemService.getAllItems();


    this.form = this.formBuilder.group({
      catPerson: ['', [Validators.required]], 
      companyname:['',[Validators.required]],
      phone: [''],
      selectedCountry: [''],
      selectedState: [''],
      selectedDistrict: [''],
      fulladdress:[''],
      lscore:[''],
      executivename:[''],
      pncode:[''],
      emails:['',[Validators.email]],
      rmark:[''],
      selectpd:[''],
      leadtype:[''],
      leadassign:[''],
      leaddate:['']
    });
   
  }
  onCountryChange() {
    console.log('selected value' + this.selectedCountry);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.selectedState);
    this.districts$ = this.districtservice.getDistricts(this.selectedState);
  }
  onNew(){
    location.reload();
  }
  
  async onSubmit() {
    const fields =  {companyname:this.companyname,catPerson:this.catPerson}
    const isValid = await this.formService.validateForm(fields);
    if(await this.formService.validateForm(fields)){
      
    console.log('Your form data : ', this.form.value);
    let leaddata:leadstore={ leaddate:this.form.value.leaddate,catPerson:this.form.value.catPerson,companyname:this.form.value.companyname,phone:this.form.value.phone,fulladdress:this.form.value.fulladdress,emails:this.form.value.emails,lscore:this.form.value.lscore,rmark:this.form.value.rmark,selectpd:this.form.value.selectpd,executivename:this.form.value.executivename,selectedCountry:this.form.value.selectedCountry,selectedState:this.form.value.selectedState,selectedDistrict:this.form.value.selectedDistrict,pncode:this.form.value.pncode,c:this.form.value.c,u:this.form.value.u,r:this.form.value.r,leadtype:this.form.value.leadtype};

    this.leadmanage.createLead(leaddata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
       this.formService.showSuccessAlert();
       this.form.reset();

      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
    setTimeout(() => {
      this.form.reset();
    }, 1000);
    } else {
        // If the form is not valid, display error messages
        Object.keys(this.form.controls).forEach(controlName => {
          const control = this.form.get(controlName);
          if (control?.invalid) {
            control.markAsTouched();
          }
        });
      }
  
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

  
}
