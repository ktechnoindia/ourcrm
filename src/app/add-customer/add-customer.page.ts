import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class AddCustomerPage implements OnInit {
  selectTabs='address';
  constructor(private router: Router) { }

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
}
