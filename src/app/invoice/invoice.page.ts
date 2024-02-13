import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InvoicePage implements OnInit {
  @Input() invoiceData: any; // Define input property to receive invoice data
  invoiceDate: string = 'January 1, 2024';
  customerName: string = 'John Doe';
  customerEmail: string = 'john@example.com';
  customerPhone: string = '123-456-7890';
  items: any[] = [
    { name: 'Item 1', quantity: 2, price: 10 },
    { name: 'Item 2', quantity: 1, price: 15 }
  ];

  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  constructor() { }

  ngOnInit() {
  }

}
