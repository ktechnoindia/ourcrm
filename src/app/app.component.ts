import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
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
  
  menuType: string = 'overlay';

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
  menu: any;

  constructor(private menuController: MenuController,private navCtrl: NavController,private router: Router) { }
  navigateToPage() {
    // Use a switch statement or if-else to navigate based on the selected value
    switch (this.selectedPage) {
      case 'editinfo':
        this.navCtrl.navigateForward('/editinfo');
        break;
      case 'usercreate':
        this.navCtrl.navigateForward('/usercreate');
        break;
      case 'useredit':
        this.navCtrl.navigateForward('/useredit');
        break;
        case 'password':
          this.navCtrl.navigateForward('/password');
          break;
          case 'add-item':
          this.navCtrl.navigateForward('/add-item');
          break;
          case 'addgroup':
          this.navCtrl.navigateForward('/addgroup');
          break;
          case 'addattribute':
          this.navCtrl.navigateForward('/addattribute');
          break;
          case 'barcode':
          this.navCtrl.navigateForward('/barcode');
          break;
          case 'hsn-manager':
          this.navCtrl.navigateForward('/hsn-manager');
          break;
          case 'add-executive':
          this.navCtrl.navigateForward('/add-executive');
          break;
          case 'roleofexicutive':
          this.navCtrl.navigateForward('/roleofexicutive');
          break;
          case 'view-executive':
          this.navCtrl.navigateForward('/view-executive');
          break;

      default:
        // Handle default case or display an error message
        break;
    }
  }
  // navigateToPage() {
  //   // Use the selectedPage value to navigate to the corresponding route
  //   this.router.navigate([this.selectedPage]);
  // }
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

    openAnotherComponent() {
      // Navigate to another component or perform your desired action here
      // Example: Navigate to another page using Ionic's NavController
      this.navCtrl.navigateForward('/another-page');
    }
    openFirst() {
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
    
closeMenu() {
  this.menuController.close(); // Close the menu
}
}
