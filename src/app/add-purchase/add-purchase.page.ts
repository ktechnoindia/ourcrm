import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class AddPurchasePage implements OnInit {
form:any;
  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  supplier: string = '';
  voucherNumber: number | null = null;
  gstin: number | null = null;
  exicutive:string='';

  constructor(private router: Router, private toastCtrl: ToastController,private formBuilder:FormBuilder,) { 
    this.form = this.formBuilder.group({
      billNumber:['',[Validators.required]],
      billDate:['',[Validators.required]],
      payment:['',[Validators.required]],
      supplier:['',[Validators.required]],
      voucherNumber:['',[Validators.required]],
      exicutive:['',[Validators.required]],
      gstin:[''],
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
  }
  goBack() {
    this.router.navigate(['/sales-manager']); // Navigate back to the previous page
  }

}
