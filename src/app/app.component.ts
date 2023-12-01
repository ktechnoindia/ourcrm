import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router'; // Import the Router module
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from './services/state.service';
import { DistrictsService } from './services/districts.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { roletypesservice } from './services/roletypes.service';
import { CountryService } from './services/country.service';
import { GsttypeService } from './services/gsttype.service';
import { UnitnameService } from './services/unitname.service';
import { IndustrytypeService } from './services/industrytype.service';
import { HsnService } from './services/hsn.service';
import { BusinesstypeService } from './services/businesstype.service';
import { CgsttypeService } from './services/cgsttype.service';
import { SegmentService } from './services/segment.service';
import { CustomerService } from './services/customer.service';
import { ExecutiveService } from './services/executive.service';
import { CustomertypeService } from './services/customertype.service';
import { VendorService } from './services/vendor.service';
import { LeadService } from './services/lead.service';
import { FollowupService } from './services/followup.service';
import { LegderService } from './services/ledger.service';
import { AddserviceService } from './services/addservice.service';
import { GstService } from './services/gst.service';
// import { AddexecutiveService } from './services/addexecutive.service';
import { RoleofexecutiveService } from './services/roleofexecutive.service';
import { AddaccountserviceService } from './services/addaccountservice.service';
import { CreateamcService } from './services/createamc.service';
import { AdditemService } from './services/additem.service';
import { AddgroupService } from './services/addgroup.service';
import { CreateunitService } from './services/createunit.service';
import { DcinService } from './services/dcin.service';
import { DcoutService } from './services/dcout.service';
import { SalesService } from './services/sales.service';
import { PurchaseService } from './services/purchase.service';
import { QuotationService } from './services/quotation.service';
import { UpdatequoteService } from './services/updatequote.service';
import { CreatecompanyService } from './services/createcompany.service';
import { EditleadService } from './services/editlead.service';
import { LeadsourceService } from './services/leadsource.service';
import { StocktypeService } from './services/stocktype.service';
import { ItemtypeService } from './services/itemtype.service';
import { AddattributeService } from './services/addattribute.service';
import { UsercreateService } from './services/usercreate.service';
import { PasswordService } from './services/password.service';
import { LoginService } from './services/login.service';
import { BarcodeService } from './services/barcode.service';
import { SalereturnService } from './services/salereturn.service';
import { PurchasereturnService } from './services/purchasereturn.service'; 
import { SignupService } from './services/signup.service';
import { InterceptorProvider } from './interceptors/interceptor';
import { HttpInterceptorModule } from './interceptors/http-interceptor.module';
import { CustomStorageModule } from './interceptors/custom-storage.module';
import { SharedService } from './shared.service';
import {  NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive,NgApexchartsModule, CommonModule,RouterModule,FormsModule,HttpClientModule,ReactiveFormsModule,HttpInterceptorModule,CustomStorageModule],
  providers: [ItemtypeService, LeadsourceService,FollowupService,StocktypeService, LeadService,DcinService,DcoutService,SalesService,PurchaseService,QuotationService,UpdatequoteService,EditleadService,CreatecompanyService,
    CustomertypeService,AddgroupService,CreateunitService,AdditemService,CreateamcService,AddaccountserviceService,RoleofexecutiveService,GstService,AddserviceService,LegderService,VendorService,ExecutiveService,CustomerService,SegmentService,CgsttypeService,BusinesstypeService,HsnService,GsttypeService,IndustrytypeService,CountryService,roletypesservice,StateService,DistrictsService,GsttypeService,UnitnameService,
 AddattributeService,UsercreateService,SignupService,InterceptorProvider,PasswordService,LoginService,BarcodeService,SalereturnService,PurchasereturnService
 ],
})
export class AppComponent {
  activeSegment: string = '';
  isMobileMenuOpen = false;
  selectedPage: string = 'add-customer';


  public appPages = [
    { title: 'Master', url: '../master', icon: 'globe' },
    { title: 'Lead Manager', url: '../lead-manager', icon: 'layers' },
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

  constructor(private sharedService: SharedService,private menuController: MenuController, private navCtrl: NavController, private router: Router) {
   
  }
  
 ;


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
  goBack() {
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

  isDropdownOpen = false;
  isDropdownOpen2 = false;
  isDropdownOpen3 = false;
  isDropdownOpen4 = false;
  isDropdownOpen5 = false;
  isDropdownOpen6 = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    // Close other dropdowns
    this.isDropdownOpen2 = false;
    this.isDropdownOpen3 = false;
    this.isDropdownOpen4 = false;
    this.isDropdownOpen5 = false;
  }
  
  toggleDropdown2() {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
    // Close other dropdowns
    this.isDropdownOpen = false;
    this.isDropdownOpen3 = false;
    this.isDropdownOpen4 = false;
    this.isDropdownOpen5 = false;
  }
  
  toggleDropdown3() {
    this.isDropdownOpen3 = !this.isDropdownOpen3;
    // Close other dropdowns
    this.isDropdownOpen = false;
    this.isDropdownOpen2 = false;
    this.isDropdownOpen4 = false;
    this.isDropdownOpen5 = false;
  }
  toggleDropdown4() {
    this.isDropdownOpen4 = !this.isDropdownOpen4;
    // Close other dropdowns
    this.isDropdownOpen = false;
    this.isDropdownOpen2 = false;
    this.isDropdownOpen3 = false;
    this.isDropdownOpen5 = false;
  }
  
  toggleDropdown5() {
    this.isDropdownOpen5 = !this.isDropdownOpen5;
    // Close other dropdowns
    this.isDropdownOpen = false;
    this.isDropdownOpen2 = false;
    this.isDropdownOpen3 = false;
    this.isDropdownOpen4 = false;

  }
  toggleDropdown6() {
    this.isDropdownOpen6 = !this.isDropdownOpen6;
    // Close other dropdowns
    this.isDropdownOpen = false;
    this.isDropdownOpen2 = false;
    this.isDropdownOpen3 = false;
    this.isDropdownOpen4 = false;

  }
  
  selectOption(option: string) {
    // Handle the selected option here (e.g., emit an event or set a variable).
    console.log(`Selected: ${option}`);
    this.isDropdownOpen = false; // Close the dropdown after selection.
  }
  selectOption2(option: string) {
    // Handle the selected option here (e.g., emit an event or set a variable).
    console.log(`Selected: ${option}`);
    this.isDropdownOpen2 = false; // Close the dropdown after selection.
  }
  selectOption3(option: string) {
    // Handle the selected option here (e.g., emit an event or set a variable).
    console.log(`Selected: ${option}`);
    this.isDropdownOpen3 = false; // Close the dropdown after selection.
  }
  selectOption4(option: string) {
    // Handle the selected option here (e.g., emit an event or set a variable).
    console.log(`Selected: ${option}`);
    this.isDropdownOpen4 = false; // Close the dropdown after selection.
  }
  selectOption5(option: string) {
    // Handle the selected option here (e.g., emit an event or set a variable).
    console.log(`Selected: ${option}`);
    this.isDropdownOpen5 = false; // Close the dropdown after selection.
  }
  selectOption6(option: string) {
    // Handle the selected option here (e.g., emit an event or set a variable).
    console.log(`Selected: ${option}`);
    this.isDropdownOpen6 = false; // Close the dropdown after selection.
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Function to close the mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  get showHeader(): boolean {
    return this.sharedService.showHeader;
  }
}
