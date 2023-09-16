import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pro-stock',
  templateUrl: './pro-stock.page.html',
  styleUrls: ['./pro-stock.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProStockPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
