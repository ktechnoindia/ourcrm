import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddLeadPage implements OnInit {

  leadOwner: string = '';
  cpName: string='';
  cName: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  pinCode: number | null = null;
  mapTO: string = '';
  address: string = '';
  productName: string = '';
  reference: string = '';
  email: string = '';
  mobileNumber: number | null = null;
  remark: string = '';

  constructor(private router: Router, private toastCtrl: ToastController) { }

  async onSubmit() {
    
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/lead-manager']); // Navigate back to the previous page
  }

}
