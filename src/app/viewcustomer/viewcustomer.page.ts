import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { NavigationExtras } from '@angular/router';
import { SessionService } from '../services/session.service';

// import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.page.html',
  styleUrls: ['./viewcustomer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  ]
})
export class ViewcustomerPage implements OnInit {
  formDate: string = '';
  toDate: string = '';
  customers$: Observable<any[]>

  searchText: string = '';
  availableColumns: string[] = [
    'Code',
    'Name',
    'GSTIN',
    'Mobile No.',
    'WhatsApp No.',
    'Email',
    'Country',
    'State',
    'District',
    'Pincode',
    'Full Address',
    'Aadhar No.',
    'PAN No.',
    'Udhyog Aadhar No.',
    'Account No.',
    'IFSC Code',
    'Bank Name',
    'Branch Name',
    'Card No.',
    'Credit Period',
    'Credit Limit',
  ];
  selectedColumns: string[] = [
    'Code',
    'Name',
    'GSTIN',
    'Mobile No.',
    'WhatsApp No.',
    'Email',
  ];

  totalItems: number = 0;
  constructor(public session: SessionService, private router: Router, private toastCtrl: ToastController, private encService: EncryptionService, private custservice: CustomerService) {
    const compid = '1';

    this.customers$ = this.custservice.fetchallCustomer(encService.encrypt(compid), '', '');
    console.log(this.customers$);

    this.customers$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });

  }

  async onSubmit() {
    if (this.formDate === '') {
      const toast = await this.toastCtrl.create({
        message: "Form Date is required",
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    } else if (this.toDate === '') {
      const toast = await this.toastCtrl.create({
        message: "To Date is required",
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: "Successfully !",
        duration: 3000,
        color: 'success',
      });
      toast.present();
    }
  }


  ngOnInit() {
  }


  ///edit customer start
  editcustomer(customer: any) {
    console.log(customer);
    let navigationExtras: NavigationExtras = {
      state: {
        customer: customer,
        edit: true
      }
    };
    this.router.navigate(['add-customer'], navigationExtras);

  }
  async openToast(msg: string) {
    this.session.openToast(msg);
  }
  

  goBack() {
    this.router.navigate(["/add-customer"])
  }
}
