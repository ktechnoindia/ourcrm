import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.page.html',
  styleUrls: ['./add-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddExecutivePage implements OnInit {


  form: any;
  submitted = false;

  role: string = '';
  name: string = '';
  manager: string = '';
  phone: number | null = null;
  email: string = '';
  wpnumber: number | null = null;
  panumber: string = '';
  commission: string = '';
  ledger: string = '';

  roletypes$: Observable<any[]>
  MenuController: any;
  roletypesservice: any;


  constructor(private router: Router, private formBuilder: FormBuilder, private toastCtrl: ToastController, private roletypes: roletypesservice) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      role: ['', [Validators.required]],
      name: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      ledger: ['', [Validators.required]],
      commission: [''],
      panumber: [''],
      wpnumber: [''],
      email: ['']
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
  navigateToVieweExecutivePage() {
    this.router.navigate(['/view-executive']); // Navigate to the target page
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }



}
