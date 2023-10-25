import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService } from '../services/hsn.service';
import { FormBuilder,Validators } from '@angular/forms';
import { AdditemService,item } from '../services/additem.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],

})
export class AddItemPage implements OnInit {
  // selectTabs = 'address';
  type: string = 'all';
  form:any;
  submitted=false;

  itemDesc: string = '';
  itemCode: number | null = null;
  selectHSN: string = '';
  selectItem:string = '';
  selectStock: string = '';
  selectPrimaryUnit: string = '';
  selectAltUnit: string = '';
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
  eanCode: number | null = null;
  minimum: number | null = null;
  reorder: string = '';
  description: string = '';
  dimension: string = '';
  weight: number | null = null;
  brandname: string = '';
  modelname: string = '';
  category: string = '';
  weightunit: number | null = null;
  relailprofit: number | null = null;
  delarprofit: number | null = null;
  selectGstservice:any;
  selectGst$: any;
  unitname$:any;
  unitname!: string; 
  hsnname$:any;
  hsnname!:string;
constructor(private router: Router, private itemService:AdditemService,private formBuilder:FormBuilder,private toastCtrl: ToastController,private gstsrvs:GsttypeService,private unittype:UnitnameService,private hsname1:HsnService) {   
     this.selectGst$=this.gstsrvs.getgsttype();
     this.unitname$=this.unittype.getunits();
     this.hsnname$=this.hsname1.gethsnservice();

     this.form = this.formBuilder.group({
      itemDesc: ['', [Validators.required]],
      itemCode: ['', [Validators.required]],
      selectItem: ['', [Validators.required]],
      selectStock: ['', [Validators.required]],
      selectItemGroup: ['', [Validators.required]],
      selectGst: [''],
      panumber: [''],
      wpnumber: [''],
      email: [''],
      unitname$: [''],
      selectAltUnit: [''],
      hsnname: [''],
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
      
    })

  }
  
  onSubmit(myform: NgForm) {
    if (this.form) {
    console.log('Your form data : ', myform.value);
    let itemdata:item={itemDesc:myform.value.itemDesc,
      itemCode:myform.value.itemCode,
      selectItem:myform.value.selectItem,
      selectStock:myform.value.selectStock,
      selectItemGroup:myform.value.selectItemGroup,
      selectGst:myform.value.selectGst,
      selectHSN:myform.value.selectHSN,
      selectPrimaryUnit:myform.value.selectPrimaryUnit,
      selectAltUnit:myform.value.selectAltUnit,
      selectunitname:myform.value.selectunitname,
      openingbalance:myform.value.openingbalance,
      closingbalance:myform.value.closingbalance,
      attr1:myform.value.attr1,
      attr2:myform.value.attr2,
      attr3:myform.value.attr3,
      attr4:myform.value.attr4,
      attr5:myform.value.attr5,
      attr6:myform.value.attr6,
      attr7:myform.value.attr7,
      attr8:myform.value.attr8,
      eanCode:myform.value.eanCode,
      minimum:myform.value.minimum,
      reorder:myform.value.reorder,
      description:myform.value.description,
      dimension:myform.value.dimension,
      weight:myform.value.weight,
      brandname:myform.value.brandname,
      modelname:myform.value.modelname,
      category:myform.value.category,
      weightunit:myform.value.weightunit,
      relailprofit:myform.value.relailprofit,
      delarprofit:myform.value.delarprofit,
      selectGstservice:myform.value.selectGstservice,
      unitname$:myform.value.unitname,
      hsnname:myform.value.hsnname,
      
      
      };
    this.itemService.createItem(itemdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  } else {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control.invalid) {
        control.markAsTouched();
      }
    })
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
    this.router.navigate(['/master']); // Navigate back to the previous page
  }

}



