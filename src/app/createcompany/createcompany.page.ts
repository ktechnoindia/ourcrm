import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule]
})
export class CreatecompanyPage implements OnInit {
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;

  countries$: Observable<any[]>
  states$: Observable<any[]>;
  districts$: Observable<any[]>
  constructor(private router: Router, private countryservice: CountryService, private stateservice: StateService, private districtservice: DistrictsService
  ) {

    this.countries$ = this.countryservice.getCountries();
    this.states$ = this.stateservice.getStates(1);
    this.districts$ = this.districtservice.getDistricts(1)
  }

  onCountryChange(){
    console.log('selected Value' + this.selectedCountry);
    this.districts$ = this.countryservice.getCountries();
  }
  onStateChange(){
    console.log('selected Value' + this.selectedState);
    this.states$=this.stateservice.getStates(1);
  }
  onDistrictChange(){
    console.log('selected Value' + this.selectedDistrict);
    this.districts$=this.districtservice.getDistricts(1);
  }


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']);
  }

}