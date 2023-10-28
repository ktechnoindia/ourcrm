import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HsnService,hsn } from '../services/hsn.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-hsn-manager',
  templateUrl: './hsn-manager.page.html',
  styleUrls: ['./hsn-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HsnManagerPage implements OnInit {
  hsnCode: string='';
  unit:string='';
  desc: string = '';
  form: FormGroup;
  subscription: Subscription = new Subscription();
  hsnCode$: Observable<any[]>
  

  constructor(private router: Router, private formBuilder:FormBuilder,private hsnService:HsnService,private toastCtrl: ToastController) { 
    this.form = this.formBuilder.group({
      hsnCode: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      desc: [''],
  })
  this.hsnCode$ = this.hsnService.getHSNNames(1);
  }

  onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let hsndata:hsn={
     hsncode:this.form.value.hsnCode,
     unit:this.form.value.unit,
     desc:this.form.value.desc,
     companyid: 1,
    };
    this.subscription=this.hsnService.createHSN(hsndata,'','').subscribe(
      (response: any) => {
       if(response.status){
        console.log('POST request successful', response);
       }
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  } 
}

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
  }  }

}