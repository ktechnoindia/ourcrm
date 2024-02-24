import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService, hsn } from '../services/hsn.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AdditemService, item } from '../services/additem.service';
import { AddgroupService, group } from '../services/addgroup.service';
import { HttpClientModule } from '@angular/common/http';
import { StocktypeService } from '../services/stocktype.service';
import { ItemtypeService } from '../services/itemtype.service';
import { FormValidationService } from '../form-validation.service';
import { AddattributeService } from '../services/addattribute.service';
import { CreateunitService, unit } from '../services/createunit.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { EncryptionService } from '../services/encryption.service';
import { SessionService } from '../services/session.service';
import { LedgergroupService } from '../services/ledgergroup.service';
interface Group {
  groupname: string;
  parentgroup: string;
  companyid: number;
}
interface Item {
  itemDesccription: string;
  classofvehicle: string;
  makersname: string;
  hourspowerofcube: string;
  fuelused: string;
  noofcylinders: string;
  yearofmanufactur: string;
  seatingcapacity: string;
  unladenweight: string;
  grossvehicleweight: string;
  bodytype: string;
  wheelbase: string;
  dealerrate: number;
  subdealerrate: number;
  attributes: any;
  itemDesc: string;
  itemCode: string;
  hsnname: string;
  selectHSN: number;
  selectItem: number;
  selectStock: number;
  selectPrimaryUnit: number;
  selectunitname: number;

  itemtype: string;
  stocktype: string;
  stocktypename: string;
  itemtypename: string;
  unitname: string;
  selectItemGroup: number;
  selectGst: number;
  openingbalance: string;
  closingbalance: string;
  selectedAttribute: string;
  files: string;
  barcode: number;
  minimum: number;
  maximum: number;
  reorder: string;
  mrp: number;
  salerate: number;
  attr1: string;
  attr2: string;
  attr3: string;
  attr4: string;
  attr5: string;
  attr6: string;
  attr7: string;
  attr8: string;

  selectGstservice: number;
  companyid: number;
  purchaserate: number;
  basicrate: number;
  labelname: string;
  valuename: string;
  framenumber: string;
  enginenumber: string;
  partnumber: string;
  color: string;
}


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterModule, IonicSelectableComponent,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemPage implements OnInit {
  searchQuery: string = '';
  hsnname$: Observable<any[]> = new Observable<any[]>();
  allOptions: any[] = [];
  filteredOptions: any[] = [];
  selectedOption: any;
  myform: FormGroup;
  submitted = false;
  type = 'address';

  itemCode: string = '';
  itemDesc: string = '';
  hsnname: string = '';
  selectItem: number = 0;
  stocktypename: string = '';
  itemtypename: string = '';
  unitname: string = '';
  selectItemGroup: number = 0;
  selectGst: number = 0;
  openingbalance: string = '';
  closingbalance: string = '';
  // selectedAttribute: string = '';
  files: string = '';
  barcode: number = 0;
  minimum: number = 0;
  maximum: number = 0;
  reorder: string = '';
  selectitemtype: number = 0;
  selectPrimaryUnit: number = 0;
  attr1: string = '';
  attr2: string = '';
  attr3: string = '';
  attr4: string = '';
  attr5: string = '';
  attr6: string = '';
  attr7: string = '';
  attr8: string = '';

  selectGstservice: number = 0;
  selectGst$: any;
  selectStock: string = '';
  // unitname$: any;
  mrp: number = 0;
  salerate: number = 0;
  purchaserate: number = 0;
  basicrate: number = 0;
  labelname: string = '';
  valuename: string = '';
  attname$: Observable<any[]>
  stocktypename$: Observable<any[]>
  itemtypename$: Observable<any[]>
  // itemgroups$: Observable<any[]>
  framenumber: string = '';
  enginenumber: string = '';
  partnumber: string = '';
  color: string = '';


  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  selectedAttribute: string = '';
  attributes: { [key: string]: string } = {};
  itemname$: Observable<any>;
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  filteredItems: string[] = [];
  searchTerm: string = '';
  hsncode: string = '';

  unit: string = '';
  hsnpop: FormGroup;

  unitpop: FormGroup;
  unit_name: string = '';
  short_name: string = '';

  groupop: FormGroup;
  itemgroupname: string = '';
  parentgroup:string = '';
  itemDesccription: string = '';
  classofvehicle: string = '';
  makersname: string = '';
  hourspowerofcube: string = '';
  fuelused: string = '';
  noofcylinders: string = '';
  yearofmanufactur: string = '';
  seatingcapacity: string = '';
  unladenweight: string = '';
  grossvehicleweight: string = '';
  bodytype: string = '';
  wheelbase: string = '';
  dealerrate: number = 0;
  subdealerrate: number = 0;

  showAttributes: boolean = false; // Define the showAttributes property
  step3: boolean = false;
  step1: boolean = false;
  units$: Observable<any[]>
  ledgergroup$: Observable<any[]>;
  groupname: string='';
  subscription: Subscription = new Subscription();
  edit: any;
  constructor(private route: ActivatedRoute,private ledgrpservice:LedgergroupService,public session: SessionService,private encService:EncryptionService,private popoverController: PopoverController, private navCtrl: NavController, private groupService: AddgroupService, private itemtype1: ItemtypeService, private formService: FormValidationService, private router: Router, private stocktype1: StocktypeService, private itemService: AdditemService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private gstsrvs: GsttypeService, private unittype: UnitnameService, private hsnservices: HsnService, private attname: AddattributeService, private hsnService: HsnService, private unitService: CreateunitService,) {
    const compid = '1';
    this.ledgergroup$ = this.ledgrpservice.getledgerGroups(1);

    this.selectGst$ = this.gstsrvs.getgsttype();
    // this.unitname$ = this.unittype.getunits();
    this.hsnname$ = this.hsnservices.getHSNNames(1);
    // this.itemgroups$ = this.groupService.getAllGroups(1);
    this.stocktypename$ = this.stocktype1.getStockTypes(1);
    this.itemtypename$ = this.itemtype1.getItemTypes(1);
    this.selectedAttribute = 'default value';
    this.attname$ = this.attname.getattribute(1);
    this.itemname$ = this.itemService.getAllItems();
    this.filteredItems = this.items;

    this.units$ = this.unitService.fetchallunit(encService.encrypt(compid),'','');
    // this.units$.subscribe(options => {
    
    // });
    this.myform = this.formBuilder.group({
      itemCode: ['', [Validators.required]],
      itemDesc: ['', [Validators.required]],
      hsnname: new FormControl(''),
      stocktypename: [''].toString(),
      itemtypename: [''].toString(),
      unitname: [''].toString(),
      selectGst: [''],
      openingbalance: [''],
      closingbalance: [''],
      selectedAttribute: [''],
      files: [''],
      barcode: [0],
      minimum: [0],
      maximum: [0],
      reorder: [''],
      selectItemGroup: [''],

      attr1: [''],
      attr2: [''],
      attr3: [''],
      attr4: [''],
      attr5: [''],
      attr6: [''],
      attr7: [''],
      attr8: [''],
      mrp: [''],
      salerate: [''],
      attributes: this.formBuilder.group({}),
      searchTerm: [''],
      purchaserate: [''],
      basicrate: [''],
      labelname: [''],
      valuename: [''],
      framenumber: [''],
      enginenumber: [''],
      partnumber: [''],
      color: [''],
      itemDesccription: [''],
      classofvehicle: [''],
      makersname: [''],
      hourspowerofcube: [''],
      fuelused: [''],
      noofcylinders: [''],
      yearofmanufactur: [''],
      seatingcapacity: [''],
      unladenweight: [''],
      grossvehicleweight: [''],
      bodytype: [''],
      wheelbase: [''],
      dealerrate: [''],
  subdealerrate: [''],
  // groupname:[''],
  itemgroupname:[''],
    });

    this.hsnpop = this.formBuilder.group({
      hsncode: ['', [Validators.required]],
      unit: [''],
    });

    this.unitpop = this.formBuilder.group({
      unit_name: ['', [Validators.required]],
      short_name: [''],
    });

    this.groupop = this.formBuilder.group({
      itemgroupname: ['', Validators.required],
      parentgroup: [''],
      searchTerm: [''],
      groupname:[''],
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Dismiss the popover before navigating
        this.closePopover();
      }
    });

  }

  filterItems() {
    // Filter items based on the search term
    this.filteredItems = this.items.filter(item => item.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  addAttribute() {
    const attributeKeys = this.getAttributeKeys();
  
    // Check if the maximum number of attributes (8) has been reached
    if (attributeKeys.length < 8) {
      const newAttributeKey = `attr${attributeKeys.length + 1}`;
      this.attributes = { ...this.attributes, [newAttributeKey]: '' };
      this.myform.addControl(newAttributeKey, this.formBuilder.control(''));
    } else {
      console.warn('Maximum number of attributes reached (8).');
    }
  }

  getAttributeKeys() {
    return Object.keys(this.attributes);
  }
  onAttributeChange() {
    // Handle the selected attribute here
    console.log('Selected Attribute:', this.selectedAttribute);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async onSubmit() {
    const fields = { itemDesc: this.itemDesc, itemCode: this.itemCode }
    const isValid = await this.formService.validateForm(fields);
    const companid=1;
    const tid =1;
    if (await this.formService.validateForm(fields)) {
      this.submitted = true;
      console.log('Your form data : ', this.myform.value);
      const keys = formatDate(new Date(), 'yMMddHH', 'en-IN');
      const userid = await this.session.getValue('userid');
      let itemdata: item = {
        itemDesc: this.myform.value.itemDesc,
        itemCode: this.myform.value.itemCode,
        hsnname:this.hsnname,
        // hsnname: this.myform.value.hsnname.toString(),
        selectHSN: 1,
        unitname: this.myform.value.unitname.toString(),
        selectItem: 1,
        selectStock: 1,
        selectPrimaryUnit: 1,
        selectunitname: 1,
        itemtype: '',
        stocktype: '',
        selectGstservice: 1,
        stocktypename: this.myform.value.stocktypename.toString(),
        itemtypename: this.myform.value.itemtypename.toString(),

        selectItemGroup: this.myform.value.selectItemGroup,
        selectGst: this.myform.value.selectGst,
        openingbalance: this.myform.value.openingbalance,
        closingbalance: this.myform.value.closingbalance,
        selectedAttribute: this.myform.value.selectedAttribute,
        files: this.myform.value.files,
        barcode: this.myform.value.barcode,
        minimum: this.myform.value.minimum,
        maximum: this.myform.value.maximum,
        reorder: this.myform.value.reorder,
        mrp: this.myform.value.mrp,
        salerate: this.myform.value.salerate,
        purchaserate: this.myform.value.purchaserate,
        basicrate: this.myform.value.basicrate,

        attr1: this.myform.value.attr1,
        attr2: this.myform.value.attr2,
        attr3: this.myform.value.attr3,
        attr4: this.myform.value.attr4,
        attr5: this.myform.value.attr5,
        attr6: this.myform.value.attr6,
        attr7: this.myform.value.attr7,
        attr8: this.myform.value.attr8,
        attributes: this.attributes,

        companyid: 1,
        labelname: this.myform.value.labelname,
        valuename: this.myform.value.valuename,
        framenumber: this.myform.value.framenumber,
        enginenumber: this.myform.value.enginenumber,
        partnumber: this.myform.value.partnumber,
        color: this.myform.value.color,
        dealerrate: this.myform.value.dealerrate,
        subdealerrate: this.myform.value.subdealerrate,
        itemDesccription: this.myform.value.itemDesccription,
        classofvehicle: this.myform.value.classofvehicle,
        makersname: this.myform.value.makersname,
        hourspowerofcube:this.myform.value.hourspowerofcube,
        fuelused:this.myform.value.fuelused,
        noofcylinders:this.myform.value.noofcylinders,
        yearofmanufactur: this.myform.value.yearofmanufactur,
        seatingcapacity: this.myform.value.seatingcapacity,
        unladenweight: this.myform.value.unladenweight,
        grossvehicleweight: this.myform.value.grossvehicleweight,
        bodytype: this.myform.value.bodytype,
        wheelbase: this.myform.value.wheelbase
      };
      if (this.edit) {
        this.itemService.editItem(companid,tid).subscribe((response: any) => {
          if (response.status) { 
            this.openToast('Saved!'); 
          } else { 
            this.openToast('Not Saved'); 
          }
        }, (error) => {
          console.log('error caught in component' + error.message);
          this.openToast('error ' + error.message);
        });
      } else {
      this.itemService.createItem(itemdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
          this.myform.reset();

        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
      this.myform.reset();

    } }else {
      //If the form is not valid, display error messages
      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      if (this.firstInvalidInput) {
        this.firstInvalidInput.setFocus();
      }
    }

  }
  openToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  onNew() {
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  ngOnInit(): void {
    // Fetch data and populate hsnOptions$
    this.fetchData();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });
    this.route.queryParams.subscribe(params => {
      const editMode = params['edit'];
      const item = JSON.parse(params['item']); // Parse the string back to an object
      
      if (editMode && item) {
        // Pre-fill form fields with item data
        this.myform.patchValue({
          itemCode:item.itemCode,
          itemDesc:item.itemDesc,
          itemDesccription:item.itemDesccription,
          hsnname:item.hsnname,
          selectGst:item.selectGst,
          unitname:item.unitname,
          selectItemGroup:item.selectItemGroup,
          mrp:item.mrp,
          purchaserate:item.purchaserate,
          basicrate:item.basicrate,
          salerate:item.salerate,
          dealerrate:item.dealerrate,
          subdealerrate:item.subdealerrate,
          stocktypename:item.stocktypename,
          itemtypename:item.itemtypename,
          openingbalance:item.openingbalance,
          closingbalance:item.closingbalance,
          attr1: item.attr1,
  attr2: item.attr2,
  attr3: item.attr3,
  attr4: item.attr4,
  attr5: item.attr5,
  attr6: item.attr6,
  attr7: item.attr7,
  attr8: item.attr8,
  barcode: item.barcode,
  basic_rate: item.basic_rate,
  companyid: item.companyid,
  crdate: item.crdate,
  isactive: item.isactive,
  itemname: item.itemname,
  itemtype: item.itemtype,
  maximum: item.maximum,
  minimum: item.minimum,
  net_rate: item.net_rate,
  purchase_rate: item.purchase_rate,
  reorder: item.reorder,
  selectGstservice: item.selectGstservice,
  selectHSN: item.selectHSN,
  selectItem: item.selectItem,
  selectPrimaryUnit: item.selectPrimaryUnit,
  selectStock: item.selectStock,
  selectunitname: item.selectunitname,
  stocktype: item.stocktype,
  tid: item.tid,
  userid: item.userid
        }
        
        
        );
      }
    });
  }
  fetchData() {
    this.units$ = this.unitService.fetchallunit('','','');
   
    this.hsnname$ = this.hsnService.getHSNNames(1);
    this.hsnname$.subscribe(options => {
      this.allOptions = options;
      // Initially, set filteredOptions to allOptions
      this.filteredOptions = [...this.allOptions];
    });
  }

  selectedImage!: string | ArrayBuffer;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  goBack() {
    this.router.navigate(['/masterdashboard']); // Navigate back to the previous page
  }

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({

    });
  }



  async OnHsnSubmit() {
    const fields = { hsncode: this.hsncode };
    const isValid = await this.formService.validateForm(fields);
  
    if (isValid) {
      console.log('Your form data : ', this.hsnpop.value);
      let hsndata: hsn = {
        hsncode: this.hsnpop.value.hsncode,
        unit: this.hsnpop.value.unit,
        companyid: 1,
      };
  
      this.hsnService.createHSN(hsndata, '', '').subscribe(
        (response: any) => {
          if (response.status) {
            console.log('POST request successful', response);
            
            // Fetch the updated HSN data again
            this.fetchHSNData();
  
            this.formService.showSuccessAlert();
          }
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
    } else {
      Object.keys(this.hsnpop.controls).forEach(controlName => {
        const control = this.hsnpop.get(controlName);
        if (control?.invalid) {
          control.markAllAsTouched();
        }
      });
    }
  }
  
  fetchHSNData() {
    this.hsnService.getHSNNames(1).subscribe(
      (response: any) => {
        // Update filteredOptions with the new HSN data
        this.filteredOptions = response;
      },
      (error: any) => {
        console.error('Failed to fetch HSN data', error);
      }
    );
  }
  

  async OnUnitSubmit() {
    const fields = { unit_name: this.unit_name };
    const isValid = await this.formService.validateForm(fields);
  
    if (isValid) {
      console.log('Your form data : ', this.unitpop.value);
      let unitdata: unit = {
        unit_name: this.unitpop.value.unit_name,
        short_name: this.unitpop.value.short_name,
        primary_unit: 0,
        decimal_place: 0,
        companyid: '1'
      };
  
      this.unitService.createUnit(unitdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
          
          // Fetch the updated unit data again
          this.fetchUnitData();
  
          // Reset the form
          this.unitpop.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
    } else {
      // If the form is not valid, display error messages
      Object.keys(this.unitpop.controls).forEach(controlName => {
        const control = this.unitpop.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  
  fetchUnitData() {
    // Assign the observable returned by fetchallunit to units$
    this.units$ = this.unitService.fetchallunit('', '', '');
    // Subscribe to the observable to trigger the HTTP request
    this.units$.subscribe(
      (response: any) => {
        // Update filteredOptions with the new HSN data
        this.filteredOptions = response;
      },
      (error: any) => {
        console.error('Failed to fetch HSN data', error);
      }
    );
  }

  

  async OnGroupSubmit() {
    const fields = { groupname: this.groupname};
    const companyid = 1;

    // Validate the form
    const isValid = await this.formService.validateForm(fields);

    if (isValid) {
        console.log('Your form data: ', this.groupop.value);

        // Construct the ledger group data
        const ledgergroupdata: Group = {
            groupname: this.groupop.value.groupname,
            parentgroup: this.groupop.value.parentgroup,
            companyid: companyid,
        };

        // Call the service method to create ledger group
        this.subscription = this.ledgrpservice.createledgerGroup(ledgergroupdata, '', '').subscribe(
            (response: any) => {
                if (response.status) {
                    console.log('POST request successful', response);
                }
                this.formService.showSuccessAlert();
                this.groupop.reset();
                this.fetchItemGroups();
            },
            (error: any) => {
                console.error('POST request failed', error);
                this.formService.showFailedAlert();
            }
        );

    } else {
        // If the form is not valid, display error messages
        Object.keys(this.groupop.controls).forEach(controlName => {
            const control = this.groupop.get(controlName);
            if (control?.invalid) {
                control.markAsTouched();
            }
        });

        if (this.firstInvalidInput) {
            this.firstInvalidInput.setFocus();
        }
    }
}


  
  fetchItemGroups() {
    this.ledgergroup$ = this.ledgrpservice.getledgerGroups(1);
  }
  
  onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for up and down arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
  filterOptions() {
    if (this.searchQuery) {
      this.filteredOptions = this.allOptions.filter(option =>
        option.hsnname.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If search query is empty, show all options
      this.filteredOptions = [...this.allOptions];
    }
  }

  selectOption(option: any) {
    // Handle option selection
    this.hsnname=option.value.hsnname;
    console.log('Selected option:', option);
  }
  toggleStep3() {
    this.step3 = !this.step3;
  }
  toggleStep1() {
    this.step1 = !this.step1;
  }
}