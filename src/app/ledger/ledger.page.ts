import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LedgerPage implements OnInit {

  name:string='';
  groupname:string='';
  address:string='';
  aname:string='';
  vendcode:string='';
  gstin:string='';
  opbalance:string='';
  clsbalance:string='';
  

  form:any;
  submitted=false;

  constructor(private router:Router, private formBuilder:FormBuilder) { 
    this.form = this.formBuilder.group({
      name:['',[Validators.required]],
      groupname:['',[Validators.required]],
      address:['',[Validators.required]],
      aname:[''],
      vendcode:[''],
      gstin:[''],
      opbalance:[''],
      clsbalance:[''],
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

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}
