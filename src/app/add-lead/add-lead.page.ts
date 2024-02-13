import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonPopover, IonicModule, PopoverController, ToastController } from '@ionic/angular';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { Observable, from } from 'rxjs';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { LeadService, leadstore } from '../services/lead.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { LeadsourceService } from '../services/leadsource.service';
import { FormValidationService } from '../form-validation.service';
import { ExecutiveService, execut } from '../services/executive.service';
import { AdditemService, item } from '../services/additem.service';
import { NavController } from '@ionic/angular';
import { roletypesservice } from '../services/roletypes.service';
import { LegderService } from '../services/ledger.service';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService } from '../services/hsn.service';
import { CreateunitService } from '../services/createunit.service';
import { AddattributeService } from '../services/addattribute.service';
import { AddgroupService } from '../services/addgroup.service';
interface lead {
  catPerson: string;
  companyname: string
  phone: string;
  emails: string;
  pncode: string;
  fulladdress: string;
  lscore: number;
  selectpd: number;
  executivename: number;
  selectedCountry: number;
  selectedState: number;
  selectedDistrict: number;
  rmark: string;
  c: number;
  u: number;
  r: number;
}

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AddLeadPage {
  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  form: FormGroup;
  submitted = false;

  catPerson: string = '';
  companyname: string = '';
  leaddate: string = '';

  phone: string = '';
  emails: string = '';
  pncode: string = '';
  fulladdress: string = '';
  lscore: number = 0;
  selectpd: number = 0;
  executname: number = 0;
  selectedCountry: number = 0;
  selectedState: number = 0;
  selectedDistrict: number = 0;
  rmark: string = '';
  leadassign: number = 0;
  c: number = 1;
  u: number = 1;
  r: number = 1;
  leadtype: number = 0;

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  leadsourcetype$: Observable<any[]>
  leadsourcetype!: number;
  executive$: any;
  lead$: any
  itemnames$: Observable<any>;

  excode: string = '';
  executivename: number = 0;
  emobile: string = '';
  ledger: string = '';
  emanager: number = 0;
  roleid: number = 0;
  executivepop: FormGroup;
  roletypes$: Observable<any[]>
  ledgers$: Observable<any>;

  itemCode: string = '';
  itemDesc: string = '';
  hsnname: string = '';
  unitname: string = '';
  selectItemGroup: number = 0;
  selectGst: number = 0;

  hsnname$: Observable<any[]>;
  unitname$: any;
  selectGst$: any;
  itemgroups$: Observable<any[]>
  itempop:FormGroup;

  @ViewChild('popover', { static: false })
  popover!: IonPopover;
  isOpen = false;

  constructor(private popoverController: PopoverController,private navCtrl:NavController,private execut: ExecutiveService, private router: Router, private formBuilder: FormBuilder, private formService: FormValidationService, private leadSourceService: LeadsourceService, private leadmanage: LeadService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private itemService: AdditemService, private addExecutiveService: ExecutiveService, private roletypes: roletypesservice,private ledgerService: LegderService, private gstsrvs: GsttypeService, private unittype: UnitnameService, private hsnservices: HsnService,  private hsnService: HsnService, private unitService: CreateunitService, private groupService: AddgroupService,
  ) {

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.leadsourcetype$ = this.leadSourceService.getleadsourcetype();
    this.executive$ = this.execut.getexecutive();
    this.itemnames$ = this.itemService.getAllItems();

    this.selectGst$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.hsnname$ = this.hsnService.getHSNNames(1);
    this.itemgroups$ = this.groupService.getAllGroups(1);

    this.leaddate = new Date().toISOString().split('T')[0];

    this.form = this.formBuilder.group({
      catPerson: ['', [Validators.required]],
      companyname: ['', [Validators.required]],
      phone: [''],
      selectedCountry: [''],
      selectedState: [''],
      selectedDistrict: [''],
      fulladdress: [''],
      lscore: [''],
      executivename: [0],
      pncode: [''],
      emails: ['', [Validators.email]],
      rmark: [''],
      selectpd: [''],
      leadtype: [''],
      leadassign: [''],
      leaddate: ['']
    });

    this.executivepop = this.formBuilder.group({
      excode: [''],
      executivename: [0],
      emobile: [''],
      ledger: [''],
      emanager: [''],
      roleid: [0],
    });
    this.itempop =  this.formBuilder.group({
      itemCode: ['', [Validators.required]],
      itemDesc: ['', [Validators.required]],
      hsnname: [''].toString(),
      unitname: [''].toString(),
      selectGst: [''],
      selectItemGroup:['']
    })

    this.roletypes$ = this.roletypes.getroletypes();
    const compid = '1';
    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Dismiss the popover before navigating
        this.closePopover();
      }
    });

  }

  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  onCountryChange() {
    console.log('selected value' + this.selectedCountry);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.selectedState);
    this.districts$ = this.districtservice.getDistricts(this.selectedState);
  }


  async onSubmit() {
    const fields = { companyname: this.companyname, catPerson: this.catPerson }
    const companyid = 1;
    const userid = 1;
    const roleid = 1;
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', this.form.value);
      let leaddata: leadstore = {
        catPerson: this.form.value.catPerson,
        companyname: this.form.value.companyname,
        phone: this.form.value.phone,
        fulladdress: this.form.value.fulladdress,
        emails: this.form.value.emails,
        lscore: this.form.value.lscore,
        rmark: this.form.value.rmark,
        selectpd: this.form.value.selectpd,
        executivename: this.form.value.executivename,
        selectedCountry: this.form.value.selectedCountry,
        selectedState: this.form.value.selectedState,
        selectedDistrict: this.form.value.selectedDistrict,
        pncode: this.form.value.pncode,
        c: companyid,
        u: userid,
        r: roleid,
        leadtype: this.form.value.leadtype,
        leaddate: this.form.value.leaddate
      };

      this.leadmanage.createLead(leaddata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
          this.form.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );

    } else {
      // If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  };

  onNew(){
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/leaddashboard']);
  }

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({
    });
  }

  async OnExecutiveSubmit() {
    const fields = {}; // Assuming there are no specific fields to validate for this form
    const isValid = await this.formService.validateForm(fields);
  
    if (isValid) {
      console.log('Your form data : ', this.executivepop.value);
      const executdata: execut = {
        roleid: this.executivepop.value.roleid,
        excode: this.executivepop.value.excode,
        executivename: this.executivepop.value.executivename,
        emanager: this.executivepop.value.emanager,
        emobile: this.executivepop.value.emobile,
        ledger: this.executivepop.value.ledger,
        companyid: 1,
        ewhatsapp: '',
        epan: '',
        ecommision: 0,
        eemail: ''
      };
  
      this.addExecutiveService.createExecutive(executdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          
          // After successfully adding the executive, fetch the updated executive data again
          this.fetchExecutiveData();
          
          // Show success alert after a delay
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
  
          // Optionally, reset the form
          this.executivepop.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          
          // Show failed alert after a delay
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 1000);
        }
      );
    } else {
      // If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
  
      // Set focus to the first invalid input field
      if (this.firstInvalidInput) {
        this.firstInvalidInput.setFocus();
      }
    }
  }
  
  fetchExecutiveData() {
    // Assuming you have a method to fetch the updated executive data
    // Here, you'll update the 'executive$' observable with the new data
    this.executive$ = this.addExecutiveService.fetchAllExecutive('','', '');
  }

  async OnItemSubmit() {
    const fields = { itemDesc: this.itemDesc, itemCode: this.itemCode };
    const isValid = await this.formService.validateForm(fields);
  
    if (isValid) {
      console.log('Your form data : ', this.itempop.value);
  
      let itemdata: item = {
        itemDesc: this.itempop.value.itemDesc,
        itemCode: this.itempop.value.itemCode,
        hsnname: this.itempop.value.hsnname.toString(),
        companyid: 1,
        attributes: '',
        selectHSN: 0,
        selectItem: 0,
        selectStock: 0,
        selectPrimaryUnit: 0,
        selectunitname: 0,
        itemtype: '',
        stocktype: '',
        stocktypename: '',
        itemtypename: '',
        unitname: this.itempop.value.unitname.toString(),
        selectItemGroup: this.itempop.value.selectItemGroup,
        selectGst: this.itempop.value.selectGst,
        openingbalance: '',
        closingbalance: '',
        selectedAttribute: '',
        files: '',
        barcode: 0,
        minimum: 0,
        maximum: 0,
        reorder: '',
        mrp: 0,
        salerate: 0,
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: '',
        attr5: '',
        attr6: '',
        attr7: '',
        attr8: '',
        selectGstservice: 0,
        purchaserate: 0,
        basicrate: 0,
        labelname: '',
        valuename: '',
        framenumber: '',
        enginenumber: '',
        partnumber: '',
        color: ''
      };
  
      this.itemService.createItem(itemdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          
          // After successfully adding the item, fetch the updated item data again
          this.fetchItemData();
          
          // Show success alert
          this.formService.showSuccessAlert();
          
          // Reset the form
          this.itempop.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
  
    } else {
      // If the form is not valid, display error messages
      Object.keys(this.itempop.controls).forEach(controlName => {
        const control = this.itempop.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  
  fetchItemData() {
    // Assuming you have a method to fetch the updated item data
    // Here, you'll update the 'itemnames$' observable with the new data
    this.itemnames$ = this.itemService.fetchallItem('','', '');
  }
  

}
