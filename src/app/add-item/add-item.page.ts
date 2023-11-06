import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService } from '../services/hsn.service';
import { FormBuilder,Validators } from '@angular/forms';
import { AdditemService,item } from '../services/additem.service';
import { AddgroupService } from '../services/addgroup.service';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { StocktypeService } from '../services/stocktype.service';
import { ItemtypeService } from '../services/itemtype.service';
import { FormValidationService } from '../form-validation.service';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule,RouterLink, RouterModule,],

})
export class AddItemPage implements OnInit {
  // selectTabs = 'address';
  type = 'address';
  myform:FormGroup;
  submitted=false;

  itemDesc: string = '';
  itemCode: number | null = null;
  selectHSN: string = '';
  selectItem:string = '';
  selectitemtype:string='';
  selectPrimaryUnit: string = '';
  // selectAltUnit: string = '';
  selectItemGroup: string = '';
  selectGst: string = '';
  selectunitname:string = '';
  openingbalance: number | null = null;
  closingbalance: number | null = null;
  attr1: string = '';
  attr2: string = '';
  attr3: string = '';
  attr4: string = '';
  attr5: string = '';
  attr6: string = '';
  attr7: string = '';
  attr8: string = '';
  barcode: number | null = null;
  files:string='';
  minimum: number | null = null;
  maximum: number | null = null;
  reorder: string = '';
  // dimension: string = '';
  // weight: number | null = null;
  // brandname: string = '';
  // modelname: string = '';
  // category: string = '';
  // weightunit: number | null = null;
  // relailprofit: number | null = null;
  // delarprofit: number | null = null;
  selectGstservice:any;
  selectGst$: any;
  selectStock:string='';
  unitname$:any;
  unitname!: string; 
  hsnname$:Observable<any[]>
  hsnname:string='';
  
  stocktypename$:Observable<any[]>
  stocktypename:string='';
  itemtypename$:Observable<any[]>
  itemtypename:string='';
  itemgroups$: Observable<any[]>


  selectedAttribute: string='';
  attributes: string[] = [];
  
constructor(private groupService:AddgroupService, private itemtype1:ItemtypeService,private formService:FormValidationService, private router: Router, private stocktype1:StocktypeService,  private itemService:AdditemService,private formBuilder:FormBuilder,private toastCtrl: ToastController,private gstsrvs:GsttypeService,private unittype:UnitnameService,private hsnservices:HsnService) {   
     this.selectGst$=this.gstsrvs.getgsttype();
     this.unitname$=this.unittype.getunits();
     this.hsnname$=this.hsnservices.getHSNNames(1);
     this.itemgroups$ = this.groupService.getAllGroups(1);
     this.stocktypename$=this.stocktype1.getStockTypes(1);
     this.itemtypename$=this.itemtype1.getItemTypes(1);
     this.selectedAttribute = 'default value';

     this.myform = this.formBuilder.group({
      itemDesc: ['', [Validators.required]],
      itemCode: ['', [Validators.required]],
      selectItem: ['', [Validators.required]],
      selectStock: ['', [Validators.required]],
      selectItemGroup: ['', [Validators.required]],
      selectGst: [''],
      unitname$: [''],
      // selectAltUnit: [''],
      hsnname: [''],
      stocktypename: [''],
      itemtypename: [''],
      openingbalance: [''],
      closingbalance: [''],
      attr1: [''],
      attr2: [''],
      attr3: [''],
      attr4: [''],
      attr5: [''],
      attr6: [''],
      attr7: [''],
      attr8: [''],
      barcode: [''],
      minimum: [''],
      maximum: [''],
      reorder: [''],
      // dimension: [''],
      // weight: [''],
      // brandname: [''],
      // modelname: [''],
      // category: [''],
      // relailprofit: [''],
      // delarprofit: [''],
      files:['']
      
    })

  }
  addAttribute() {
    this.attributes.push(''); // Add a new empty attribute
  }
  onAttributeChange() {
    // Handle the selected attribute here
    console.log('Selected Attribute:', this.selectedAttribute);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  
 async onSubmit() {
    const fields = {itemDesc:this.itemDesc,itemCode:this.itemCode,selectItemGroup:this.selectItemGroup,}
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      this.submitted=true;
    console.log('Your form data : ', this.myform.value);
    let itemdata:item={
      itemDesc: this.myform.value.itemDesc,
      itemCode: this.myform.value.itemCode,
      selectItem: this.myform.value.selectItem,
      selectStock: this.myform.value.selectStock,
      selectItemGroup: this.myform.value.selectItemGroup,
      selectGst: this.myform.value.selectGst,
      selectHSN: this.myform.value.selectHSN,
      itemtypename: this.myform.value.itemtypename,
      stocktypename: this.myform.value.stocktypename,
      selectPrimaryUnit: this.myform.value.selectPrimaryUnit,
      // selectAltUnit: this.myform.value.selectAltUnit,
      selectunitname: this.myform.value.selectunitname,
      openingbalance: this.myform.value.openingbalance,
      closingbalance: this.myform.value.closingbalance,
      attr1: this.myform.value.attr1,
      attr2: this.myform.value.attr2,
      attr3: this.myform.value.attr3,
      attr4: this.myform.value.attr4,
      attr5: this.myform.value.attr5,
      attr6: this.myform.value.attr6,
      attr7: this.myform.value.attr7,
      attr8: this.myform.value.attr8,
      barcode: this.myform.value.barcode,
      minimum: this.myform.value.minimum,
      maximum: this.myform.value.maximum,
      reorder: this.myform.value.reorder,
      // description: this.myform.value.description,
      // dimension: this.myform.value.dimension,
      // weight: this.myform.value.weight,
      // brandname: this.myform.value.brandname,
      // modelname: this.myform.value.modelname,
      // category: this.myform.value.category,
      // weightunit: this.myform.value.weightunit,
      // relailprofit: this.myform.value.relailprofit,
      // delarprofit: this.myform.value.delarprofit,
      selectGstservice: this.myform.value.selectGstservice,
      unitname$: this.myform.value.unitname,
      hsnname$: this.myform.value.hsnname,
      hsnname: this.myform.value.hsnname,
      stocktypename$: this.myform.value.stocktypename,
      itemtypename$: this.myform.value.itemtypename,
      unitname: '',
      itemtype: '',
      stocktype: ''
    };
    this.itemService.createItem(itemdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        this.formService.showSuccessAlert();
      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
    setTimeout(() => {
      // Reset the form and clear input fields
      this.myform.reset();
    }, 1000); 
  }  else {
    //If the form is not valid, display error messages
    Object.keys(this.myform.controls).forEach(controlName => {
      const control = this.myform.get(controlName);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }
  
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
    this.router.navigate(['/item-master']); // Navigate back to the previous page
  }

}



