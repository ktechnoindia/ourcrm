import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bill-manager',
  templateUrl: './bill-manager.page.html',
  styleUrls: ['./bill-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BillManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
