import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService } from '../services/hsn.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AdditemService, item } from '../services/additem.service';
import { AddgroupService } from '../services/addgroup.service';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { StocktypeService } from '../services/stocktype.service';
import { ItemtypeService } from '../services/itemtype.service';
import { FormValidationService } from '../form-validation.service';
import { AddattributeService } from '../services/addattribute.service';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterModule,],

})
export class AddItemPage implements OnInit {

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
  unitname$: any;
  mrp: number = 0;
  salerate: number = 0;
  purchaserate:number=0;
  hsnname$: Observable<any[]>
  attname$: Observable<any[]>
  stocktypename$: Observable<any[]>
  itemtypename$: Observable<any[]>
  itemgroups$: Observable<any[]>

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  selectedAttribute: string = '';
  attributes: { [key: string]: string } = {}; 
   itemname$: Observable<any>;
   items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
   filteredItems: string[] = [];
   searchTerm: string = '';
  constructor(private navCtrl: NavController,private groupService: AddgroupService, private itemtype1: ItemtypeService, private formService: FormValidationService, private router: Router, private stocktype1: StocktypeService, private itemService: AdditemService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private gstsrvs: GsttypeService, private unittype: UnitnameService, private hsnservices: HsnService, private attname: AddattributeService) {
    this.selectGst$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.hsnname$ = this.hsnservices.getHSNNames(1);
    this.itemgroups$ = this.groupService.getAllGroups(1);
    this.stocktypename$ = this.stocktype1.getStockTypes(1);
    this.itemtypename$ = this.itemtype1.getItemTypes(1);
    this.selectedAttribute = 'default value';
    this.attname$ = this.attname.getattribute(1);
    this.itemname$ = this.itemService.getAllItems();
    this.filteredItems = this.items;
    this.myform = this.formBuilder.group({
      itemCode: ['', [Validators.required]],
      itemDesc: ['', [Validators.required]],
      hsnname: [''].toString(),
      stocktypename: [''].toString(),
      itemtypename: [''],
      unitname: [''].toString(),
      selectGst: [''],
      openingbalance: [''],
      closingbalance: [''],
      selectedAttribute: [''],
      files: [''],
      barcode: [''],
      minimum: [''],
      maximum: [''],
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
      mrp:[''],
      salerate:[''],
      attributes: this.formBuilder.group({}),
      searchTerm:[''],
      purchaserate:['']
    })

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
    if (await this.formService.validateForm(fields)) {
      this.submitted = true;
      console.log('Your form data : ', this.myform.value);

      let itemdata: item = {
        itemDesc: this.myform.value.itemDesc,
        itemCode: this.myform.value.itemCode,
        hsnname: this.myform.value.hsnname.toString(),
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
        mrp : this.myform.value.mrp,
        salerate: this.myform.value.salerate,
        purchaserate: this.myform.value.purchaserate,

        attr1: this.myform.value.attr1,
        attr2: this.myform.value.attr2,
        attr3: this.myform.value.attr3,
        attr4: this.myform.value.attr4,
        attr5: this.myform.value.attr5,
        attr6: this.myform.value.attr6,
        attr7: this.myform.value.attr7,
        attr8: this.myform.value.attr8,
        attributes: this.attributes,

        companyid:1

      };
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

    } else {
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

  onNew(){
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  ngOnInit() {
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

}



