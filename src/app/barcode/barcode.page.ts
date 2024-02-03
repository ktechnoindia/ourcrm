import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BarcodeService, bar } from '../services/barcode.service';
import { FormValidationService } from '../form-validation.service';
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class BarcodePage implements OnInit {

  form: FormGroup;
  barcodeaddress: string = '';
  sacnumber: string = '';
  description: string = '';
  constructor(private navCtrl: NavController,private router: Router, private formBuilder: FormBuilder, private barcodeService: BarcodeService, private formService: FormValidationService) {
    this.form = formBuilder.group({
      barcodeaddress: [''],
      sacnumber: [''],
      description: [''],
    })
  }
  onNew() {
    location.reload();
  }
   onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  async onSubmit() {
    const fields = {};
    const isValid = await this.formService.validateForm(fields);
    if(await this.formService.validateForm(fields)){
      const barcodedata:bar={
        barcodeaddress:this.form.value.barcodeaddress,sacnumber:this.form.value.sacnumber,description:this.form.value.description
      }
      this.barcodeService.createBarcode(barcodedata,'','').subscribe(
        (response:any)=>{
          console.log('Post request Successfully',response);
          this.formService.showSuccessAlert();
          this.form.reset();

        },
        (error:any)=>{
          console.log('Post request Failed',error);
          this.formService.showFailedAlert();
        }
      );
           this.form.reset();

    }else{
      Object.keys(this.form.controls).forEach(controlName =>{
        const control = this.form.get(controlName);
        if(control?.invalid){
          control.markAllAsTouched();
        }
      })
    }
  }
  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/item-master']);
  }

}