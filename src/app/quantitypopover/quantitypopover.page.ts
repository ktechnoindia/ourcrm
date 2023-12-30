import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavParams, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-quantitypopover',
  templateUrl: './quantitypopover.page.html',
  styleUrls: ['./quantitypopover.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  
})
export class QuantitypopoverPage implements OnInit {
  attr1: string='';
  attr2: string='';
  attr3: string='';
  attr4: string='';

  @Input() quantity: number=0;
  rows: any[] = [];
  rowData: any[] = [];
  constructor(private navParams: NavParams, private popoverController: PopoverController) {}
 

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({
     
    });
  }

  ngOnInit(): void {
    this.rows = Array.from({ length: this.quantity }, (_, index) => index + 1);
    // Initialize rowData based on your data structure
    this.rowData = Array.from({ length: this.quantity }, () => ({
      attr1: '',
      attr2: '',
      attr3: '',
      attr4: '',
      attr5: '',
      // Add more properties as needed
    }));
  }  
}
