import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddattributeService, addattribute } from '../services/addattribute.service';

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
  attdetails: string = '';
  myform: any;
  submitted = false;

  constructor(private router: Router, private addatt: AddattributeService, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.myform = this.formBuilder.group({
      attname: [''],
      // attdetails: ['']
    })

  }

  ngOnInit() {
    // Page initialization code goes here
  }


  onSubmit() {
    if (this.myform.invalid) {
      this.submitted = true;
      console.log('Your form data : ', this.myform.value);
      let attdata: addattribute = {
        attname: this.myform.value.attname,
        // attdetails: this.myform.value.attdetails,

      };
      this.addatt.createAttribute(attdata, '', '').subscribe(
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

  goBack() {
    this.router.navigate(['/master']);
  }

}
