import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.page.html',
  styleUrls: ['./add-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddSalePage implements OnInit {

  form:any;

  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  cName: string = '';
  orderDate: string = '';
  orderNumber: number | null = null;
  gstin: number | null = null;
  salePerson: string = '';

  constructor(private router: Router,private formBuilder:FormBuilder, private toastCtrl: ToastController) {
    this.form = this.formBuilder.group({
      billNumber:['',[Validators.required]],
      billDate:['',[Validators.required]],
      payment:['',[Validators.required]],
      cName:['',[Validators.required]],
      orderDate:['',[Validators.required]],
      orderNumber:['',[Validators.required]],
      gstin:[''],
      salePerson:[''],
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
    this.router.navigate(["/sales-manager"])
  }
}
