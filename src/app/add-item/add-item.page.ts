import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { HsnService } from '../services/hsn.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],

})
export class AddItemPage implements OnInit {
  selectTabs = 'address';

  itemDesc: string = '';
  itemCode: number | null = null;
  selectHSN: string = '';
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
constructor(private router: Router, private toastCtrl: ToastController,private gstsrvs:GsttypeService,private unittype:UnitnameService,private hsname1:HsnService) {   
     this.selectGst$=this.gstsrvs.getgsttype();
     this.unitname$=this.unittype.getunits();
     this.hsnname$=this.hsname1.gethsnservice();
  }

  async onSubmit() {
   if(this.itemDesc===''){
    const toast = await this.toastCtrl.create({
      message:"Item Description is required",
      duration:3000,
      color:'danger',
    });
      toast.present();
   }else if(this.itemCode==null){
    const toast = await this.toastCtrl.create({
      message:"Item Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.selectHSN==''){
    const toast = await this.toastCtrl.create({
      message:"Select HSN Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.selectStock==null){
    const toast = await this.toastCtrl.create({
      message:"Select Stock is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.selectPrimaryUnit==''){
    const toast = await this.toastCtrl.create({
      message:"Select Primary Unit is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.selectAltUnit==''){
    const toast = await this.toastCtrl.create({
      message:"Select Alternate Unit is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.selectItemGroup==''){
    const toast = await this.toastCtrl.create({
      message:"Select Item Group is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.selectGst==''){
    const toast = await this.toastCtrl.create({
      message:"Select GST Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.openingbalance==null){
    const toast = await this.toastCtrl.create({
      message:"Opening Balance is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.closingbalance==null){
    const toast = await this.toastCtrl.create({
      message:"Closing Balance is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.attr1==''){
    const toast = await this.toastCtrl.create({
      message:"Attr1 is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.attr2==''){
    const toast = await this.toastCtrl.create({
      message:"Attr2 is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.attr3==''){
    const toast = await this.toastCtrl.create({
      message:"Attr3 is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.attr4==''){
    const toast = await this.toastCtrl.create({
      message:"Attr4 is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.eanCode==null){
    const toast = await this.toastCtrl.create({
      message:"EAN Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.minimum==null){
    const toast = await this.toastCtrl.create({
      message:"Minimum is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.reorder==''){
    const toast = await this.toastCtrl.create({
      message:"Re-Order is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.description==null){
    const toast = await this.toastCtrl.create({
      message:"Description is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.dimension==''){
    const toast = await this.toastCtrl.create({
      message:"Dimesion is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.weight==null){
    const toast = await this.toastCtrl.create({
      message:"Weight is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.brandname==''){
    const toast = await this.toastCtrl.create({
      message:"Item Code is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.modelname==''){
    const toast = await this.toastCtrl.create({
      message:"Model is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.category==''){
    const toast = await this.toastCtrl.create({
      message:"Category is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.weightunit==null){
    const toast = await this.toastCtrl.create({
      message:"Weight Unit is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.relailprofit==null){
    const toast = await this.toastCtrl.create({
      message:"Retailer Profit is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
   }else if(this.delarprofit==null){
    const toast = await this.toastCtrl.create({
      message:"Delar Profit is required",
      duration:3000,
      color:'danger'
    });
    toast.present();
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



