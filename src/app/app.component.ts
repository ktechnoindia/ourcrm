import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Master', url: '../master', icon: 'globe' },
    {
      title: 'Lead Manager',
      subPages: [
        { title: 'Add Lead', url: '../lead-manager/add-lead', icon: 'add' },
        { title: 'Follow Up', url: '../lead-manager/follow-up', icon: 'clipboard' },
        { title: 'Transfer Lead', url: '../lead-manager/transfer-lead', icon: 'swap-horizontal' },
        { title: 'View Lead', url: '../lead-manager/view-lead', icon: 'eye' },
      ],
      icon: 'layers'
    },
    { title: 'Quote Manager', url: '../quote-manager', icon: 'desktop' },
    { title: 'Sales Manager', url: '../sales-manager', icon: 'cart' },
    { title: 'Stock Manager', url: '../stock-manager', icon: 'clipboard' },
    { title: 'Account Manager', url: '../account-manager', icon: 'calculator' },
    { title: 'AMC Manager', url: '../amc-manager', icon: 'newspaper' },
    { title: 'Logout', url: '../login', icon: 'key' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private router: Router) { }
  
  onDropdownChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue) {
      // Use the Router module to navigate to the selected route
      this.router.navigate([selectedValue]);
    }
  }
}
