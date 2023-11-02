import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddattributeService, addattribute } from '../services/addattribute.service';
import { FormValidationService } from '../form-validation.service';

@Component({
  selector: 'app-addattribute',
  templateUrl: './addattribute.page.html',
  styleUrls: ['./addattribute.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule,]
})
export class AddattributePage implements OnInit {
  type = 'address';
  attname: string = '';
 
  myform: FormGroup;
  submitted = false;

  constructor(private router: Router, private addatt: AddattributeService,private formService:FormValidationService, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.myform = this.formBuilder.group({
      attname: ['',Validators.required],
      // attdetails: ['']
    })

  }

  ngOnInit() {
    // Page initialization code goes here
  }


  async  onSubmit() {
    const fields = {attname:this.attname}
    const isValid = this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      this.submitted = true;
      console.log('Your form data : ', this.myform.value);
      let attdata: addattribute = {
        attname: this.myform.value.attname,
        
      };
      this.addatt.createAttribute(attdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
      setTimeout(() => {
        this.myform.reset();
      }, 1000);
    }else{
      Object.keys(this.myform.controls).forEach(controlName =>{
        const control = this.myform.get(controlName);
        if(control?.invalid){
          control.markAllAsTouched()
        }
      })
    }

  }

  goBack() {
    this.router.navigate(['/master']);
  }

}
