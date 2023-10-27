import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService } from '../services/hsn.service';
import { FormBuilder,Validators } from '@angular/forms';
import { AdditemService,item } from '../services/additem.service';
import { AddgroupService } from '../services/addgroup.service';
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
  myform:FormGroup;
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
  files:string='';
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
  itemgroups$: Observable<any[]>
  
constructor(private groupService:AddgroupService, private router: Router, private itemService:AdditemService,private formBuilder:FormBuilder,private toastCtrl: ToastController,private gstsrvs:GsttypeService,private unittype:UnitnameService,private hsname1:HsnService) {   
     this.selectGst$=this.gstsrvs.getgsttype();
     this.unitname$=this.unittype.getunits();
     this.hsnname$=this.hsname1.gethsnservice(1);
     this.itemgroups$ = this.groupService.getAllGroups(1);
     this.myform = this.formBuilder.group({
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
      eanCode: [''],
      minimum: [''],
      reorder: [''],
      description: [''],
      dimension: [''],
      weight: [''],
      brandname: [''],
      modelname: [''],
      category: [''],
      relailprofit: [''],
      delarprofit: [''],
      files:['']
    })

  }
  
  onSubmit() {
   
    if (this.myform.invalid) {
      this.submitted=true;
    console.log('Your form data : ', this.myform.value);
    let itemdata:item={itemDesc:this.myform.value.itemDesc,
      itemCode:this.myform.value.itemCode,
      selectItem:this.myform.value.selectItem,
      selectStock:this.myform.value.selectStock,
      selectItemGroup:this.myform.value.selectItemGroup,
      selectGst:this.myform.value.selectGst,
      selectHSN:this.myform.value.selectHSN,
      selectPrimaryUnit:this.myform.value.selectPrimaryUnit,
      selectAltUnit:this.myform.value.selectAltUnit,
      selectunitname:this.myform.value.selectunitname,
      openingbalance:this.myform.value.openingbalance,
      closingbalance:this.myform.value.closingbalance,
      attr1:this.myform.value.attr1,
      attr2:this.myform.value.attr2,
      attr3:this.myform.value.attr3,
      attr4:this.myform.value.attr4,
      attr5:this.myform.value.attr5,
      attr6:this.myform.value.attr6,
      attr7:this.myform.value.attr7,
      attr8:this.myform.value.attr8,
      eanCode:this.myform.value.eanCode,
      minimum:this.myform.value.minimum,
      reorder:this.myform.value.reorder,
      description:this.myform.value.description,
      dimension:this.myform.value.dimension,
      weight:this.myform.value.weight,
      brandname:this.myform.value.brandname,
      modelname:this.myform.value.modelname,
      category:this.myform.value.category,
      weightunit:this.myform.value.weightunit,
      relailprofit:this.myform.value.relailprofit,
      delarprofit:this.myform.value.delarprofit,
      selectGstservice:this.myform.value.selectGstservice,
      unitname$:this.myform.value.unitname,
      hsnname:this.myform.value.hsnname,
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



