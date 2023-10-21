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
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],

})
export class AddItemPage implements OnInit {
  selectTabs = 'address';
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
constructor(private router: Router, private toastCtrl: ToastController,private gstsrvs:GsttypeService,private unittype:UnitnameService,private hsname1:HsnService) {   
     this.selectGst$=this.gstsrvs.getgsttype();
     this.unitname$=this.unittype.getunits();
     this.hsnname$=this.hsname1.gethsnservice();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Selected Value' + this.form.value);
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



