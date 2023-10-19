import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';


@Component({
  selector: 'app-gst',
  templateUrl: './gst.page.html',
  styleUrls: ['./gst.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GstPage implements OnInit {

  selectedState: any;
  selectedDistrict:any;
  selectedCountry: any;

  countries$:Observable<any[]>
  states$: Observable<any[]>;
  districts$:Observable<any[]>
  constructor(private router:Router,private countryservice: CountryService, private stateservice: StateService,private districtservice:DistrictsService) {
    this.states$=this.stateservice.getStates(1)
    this.countries$=this.countryservice.getCountries();
    this.districts$=this.districtservice.getDistricts(1);
   }

   onCountryChange() {
    console.log('selected value' + this.selectedCountry);
    this.countries$ = this.countryservice.getCountries();
   }
   onStateChange() {
    console.log('selected value' + this.selectedState);
    this.states$ = this.stateservice.getStates(1);
   }

   onDistrictChange() {
    console.log('selected value' + this.selectedDistrict);
    this.districts$ = this.districtservice.getDistricts(1);
   }


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}
