import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddserviceService,serv } from '../services/addservice.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddServicePage implements OnInit {
  service_code:string='';
  service_type:string='';
  stock_type:string='';
  sac_code:string='';
  item_description:string='';

  myform:any;
  submitted=false;

  constructor(private router: Router, private addService:AddserviceService,private formBuilder:FormBuilder, private toastCtrl:ToastController) { 
    this.myform = this.formBuilder.group({
      service_code:['',[Validators.required]],
      service_type:['',[Validators.required]],
      stock_type:['',[Validators.required]],
      sac_code:['',[Validators.required]],
      item_description:['']
    })
  }

  onSubmit(myform: NgForm) {
    if (this.myform) {
    console.log('Your form data : ', myform.value);
    let servicedata:serv={service_code:myform.value.service_code,service_type:myform.value.service_type,stock_type:myform.value.stock_type,sac_code:myform.value.sac_code,item_description:myform.value.item_description,};
    this.addService.createService(servicedata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  } else {
    Object.keys(this.myform.controls).forEach(controlName => {
      const control = this.myform.get(controlName);
      if (control.invalid) {
        control.markAsTouched();
      }
    })
  }
}

  // onSubmit(form:any) {
  //   if (this.form) {
  //     console.log('Selected Value' + this.form.value);
  //     let servicedata:serv={
  //       service_code:form.value.service_code,
  //       service_type:form.value.service_type,
  //       stock_type:form.value.stock_type,
  //       sac_code:form.value.sac_code,
  //       item_description:form.value.item_description,
  //     }
  //     this.addService.createService(servicedata,'','').subscribe(
  //       (response:any) =>{
  //         console.log('POST request successful', response);
  //       },
  //       (error:any) =>{
  //         console.log('POST Error', error);
  //       }
  //     )
  //   } else {
  //     Object.keys(this.form.controls).forEach(controlName => {
  //       const control = this.form.get(controlName);
  //       if (control.invalid) {
  //         control.markAsTouched();
  //       }
  //     })
  //   }
  // }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }

}
