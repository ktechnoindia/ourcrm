import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.page.html',
  styleUrls: ['./stock-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
