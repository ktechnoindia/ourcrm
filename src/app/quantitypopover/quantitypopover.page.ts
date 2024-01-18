import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, PopoverController, } from '@ionic/angular';
import { QuantitypopoverService } from '../services/quantitypopover.service';

@Component({
  selector: 'app-quantitypopover',
  templateUrl: './quantitypopover.page.html',
  styleUrls: ['./quantitypopover.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],
})
export class QuantitypopoverPage implements OnInit {
  @Input() quantity: number=0;
  myform: FormGroup;
  rows: any[] = [];
  rowData: any[] = [];
  attr1: string='';
  attr2:string='';
  attr3: string='';
  attr4: string='';
  attr5: string='';
  attr6: string='';
  attr7: string='';
  attr8: string='';
  constructor(private formBuilder: FormBuilder,private popoverController: PopoverController,private quantityService:QuantitypopoverService) {

    this.myform = this.formBuilder.group({
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

  closePopover() {
    this.popoverController.dismiss();
  }

  ngOnInit(): void {
    this.rows = Array.from({ length: this.quantity }, (_, index) => index + 1);
    this.rowData = Array.from({ length: this.quantity }, () => ({
      attr1: '',
      attr2: '',
      attr3: '',
      attr4: '',
      attr5: '',
      attr6: '',
      attr7: '',
      attr8: '',

      // Add more properties as needed
    }));
  }

  onSubmit(myform:FormGroup) {
    // Create an array to store all attribute values
    const formDataArray = [];
 
    // Loop through the rows and push the attribute values to the array
    for (let i = 0; i < this.quantity; i++) {
      const formData = {
        attr1: this.rowData[i].attr1,
        attr2: this.rowData[i].attr2,
        attr3: this.rowData[i].attr3,
        attr4: this.rowData[i].attr4,
        attr5: this.rowData[i].attr5,
        attr6: this.rowData[i].attr6,
        attr7: this.rowData[i].attr7,
        attr8: this.rowData[i].attr8,
      };
  
      formDataArray.push(formData);
    }
    this.quantityService.createQuantity(formDataArray,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
      },
      (error: any) => {
        console.error('POST request failed', error);
       
      }
    )
    // Log the array of all attribute values
    console.log('Form submitted:', formDataArray);
  
    // You can add logic to send the data to the server or perform other actions
  
    // this.closePopover();
  }
  
  
}
