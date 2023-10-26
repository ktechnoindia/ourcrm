import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HsnService,hsn } from '../services/hsn.service';
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

  constructor(private router: Router, private formBuilder:FormBuilder,private hsnService:HsnService,private toastCtrl: ToastController) { 
    this.form = this.formBuilder.group({
      hsnCode: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      desc: [''],
  })
  }

  onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let hsndata:hsn={
     hsnCode:this.form.value.hsnCode,
     unit:this.form.value.unit,
     desc:this.form.value.unit,
    };
    this.hsnService.createHSN(hsndata,'','').subscribe(
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

  // async onSubmit() {
  //   if (this.hsnCode === null) {
  //     const toast = await this.toastCtrl.create({
  //       message: "HSN Code is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.unit===null){
  //     const toast = await this.toastCtrl.create({
  //       message: "Unit is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.desc===''){
  //     const toast = await this.toastCtrl.create({
  //       message: "Description is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else{
  //       const toast = await this.toastCtrl.create({
  //         message: "Successffully",
  //         duration: 3000,
  //         color: 'success'
  //       });
  //       toast.present();
  //   }
  // }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/master"])
  }

}
