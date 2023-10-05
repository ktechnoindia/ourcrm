import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class AddCustomerPage implements OnInit {
  selectTabs='address';
  cname:string='';


  constructor(private fb:FormBuilder,private router: Router,private formBuilder: FormBuilder) { }

  segmentChanged(event: any) {
    const selectedValue = event.detail.value;
    // Handle the selected segment value here
    console.log('Selected Segment Value:', selectedValue);
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
  async onSubmit(form: NgForm) {
    if(form.value.cname==''){
      this.openToast('Enter customer name');
      return;
    }
  }
  openToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  
}
