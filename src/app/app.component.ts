import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router'; // Import the Router module
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule,RouterModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [
    CountryService,
  ],
})
export class AppComponent {
  activeSegment: string = '';

  selectedPage: string = 'add-customer';

  public appPages = [
    { title: 'Master', url: '../master', icon: 'globe' },
    { title: 'Lead Manager', url: '../lead-manager', icon: 'layers'},
    { title: 'Quote Manager', url: '../quote-manager', icon: 'desktop' },
    { title: 'HSN Manager', url: '../hsn-manager', icon: 'desktop' },
    { title: 'Challan Manager', url: '../challan-manager', icon: 'desktop' },
    { title: 'Sales Manager', url: '../sales-manager', icon: 'cart' },
    { title: 'Stock Manager', url: '../stock-manager', icon: 'clipboard' },
    { title: 'Account Manager', url: '../account-manager', icon: 'calculator' },
    { title: 'AMC Manager', url: '../amc-manager', icon: 'newspaper' },
    { title: 'Logout', url: '../login', icon: 'key' },

  ];
 
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private navCtrl: NavController,private router: Router) { }
  
  onDropdownChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue) {
  
      this.router.navigate([selectedValue]);
    }
  }
  navigateToRoute(event: any) {
    const selectedValue = event.target.value;
    // Navigate to the selected route
    this.router.navigate([selectedValue]);
  }
  goBack(){
    this.router.navigate(["/"])
  }
    //router of segment
    toggleSegment(segment: string) {
      this.activeSegment = segment;
    }
    
  //pages connect
    segmentChanged() {
      // Use the selectedPage value to navigate to the corresponding page
      this.navCtrl.navigateForward('/' + this.selectedPage);
    }
    customPopoverOptions: any = {
      header: 'Select an Option',
      cssClass: 'custom-select-popover',
      mode: 'ios', // You can change the mode to 'md' for Material Design
      translucent: true, // Makes the dropdown background slightly transparent
    };
}
