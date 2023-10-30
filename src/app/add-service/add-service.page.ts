import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddserviceService,serv } from '../services/addservice.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterLink, RouterModule,]
})
export class AddServicePage implements OnInit {
  service_code:string='';
  service_type:string='';
  stock_type:string='';
  sac_code:string='';
  item_description:string='';

  myform:FormGroup;
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

  onSubmit() {
    if (this.myform) {
      this.submitted=true;
    console.log('Your form data : ', this.myform.value);
    let servicedata:serv={service_code:this.myform.value.service_code,service_type:this.myform.value.service_type,stock_type:this.myform.value.stock_type,sac_code:this.myform.value.sac_code,item_description:this.myform.value.item_description,};
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
