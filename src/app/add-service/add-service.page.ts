import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddServicePage implements OnInit {
  serviceCode:number | null= null;
  service:string='';
  stocktype:string='';
  sacode:string='';
  itemDesc:string='';

  form:any;
  submitted=false;

  constructor(private router: Router, private formBuilder:FormBuilder, private toastCtrl:ToastController) { 
    this.form = this.formBuilder.group({
      serviceCode:['',[Validators.required]],
      service:['',[Validators.required]],
      stocktype:['',[Validators.required]],
      sacode:['',[Validators.required]],
      itemDesc:['']
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
    this.router.navigate(['/master']); // Navigate back to the previous page
  }

}
