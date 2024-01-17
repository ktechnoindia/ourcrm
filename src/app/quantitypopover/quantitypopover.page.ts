import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavParams, PopoverController } from '@ionic/angular';
import { AdditemService } from '../services/additem.service';
interface RowData {
  [key: string]: string;
}
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
  rowData: RowData[] = [];
  selectedItemAttributes: any[] = [];
  tid: any;

  constructor(private itemService: AdditemService,private navParams: NavParams, private popoverController: PopoverController) {
    this.tid = 'someItemId'; // Replace 'someItemId' with the actual item ID

  }
 

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({
     
    });
  }

  ngOnInit(): void {
    const compid=1;
    this.itemService.getAllItemsattr(this.tid).subscribe((attributes: string[]) => {
      this.selectedItemAttributes = attributes;
    
      // Initialize rowData based on the retrieved attributes
      this.rowData = Array.from({ length: this.quantity }, () => {
        const row: RowData = {};
        this.selectedItemAttributes.forEach((attr: string) => {
          row[attr] = '';
        });
        return row;
      });
    });
  }
}
