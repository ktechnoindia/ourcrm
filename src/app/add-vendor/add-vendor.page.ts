import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddVendorPage implements OnInit {
  selectTabs='address';

  constructor() { }

  ngOnInit() {
  }

}
