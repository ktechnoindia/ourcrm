import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
  providers: [DatePipe],

})
export class CreatecompanyPage implements OnInit {
  rdate:string | undefined ='' ;
  selectedState: any;
  selectedDistrict:any;
  selectedOption: string = '';
  countries$:Observable<any[]>
  states$:Observable<any[]>
  districts$:Observable<any[]>
  countryService: any;
  districtservice: any;
  stateservice: any;
  constructor(private router:Router,private datePipe: DatePipe,private country:CountryService,private state:StateService,private districts:DistrictsService
    ) 
    {
      this.rdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString();
      this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
      this.countries$=this.country.getCountries();
      this.districts$=this.districts.getDistricts(1);
     }
     onCountryChange() {
      console.log('selected value' + this.selectedOption);
      this.states$ = this.state.getStates(1);this.states$ = this.stateservice.getStates(1);
     }
     onStateChange() {
      console.log('selected value' + this.selectedState);
      this.districts$ = this.districts.getDistricts(this.selectedState);
     }
   
     getCurrentDate(){
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
  }



  getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']);
  }

}