import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
  providers: [DatePipe],

})
export class CreatecompanyPage implements OnInit {
  rdate: string | undefined = '';
  gstin:string='';
  cpyname: string = '';
  state: string = '';
  address: string = '';
  phone:string='';
  wpnumber:string='';
  email:string='';
  date:string='';
  pinCode:string='';
  selectedCountry:string='';
  selectedState:string='';
  selectedDistrict:string='';
  form: any;
  submitted = false;

  constructor(private router: Router, private datePipe: DatePipe, private formBuilder: FormBuilder
  ) {
    this.rdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString();

    this.form = formBuilder.group({
      cpyname: ['', [Validators.required]],
      selectedCountry: ['', [Validators.required]],
      selectedDistrict: ['', [Validators.required]],
      selectedState: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gstin:[''],
      phone:[''],
      wpnumber:[''],
      email:[''],
  date:[''],
  pinCode:[''],

    })

  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Selected Value' + this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control.invalid) {
          control.markAsTouched();
        }
      })
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