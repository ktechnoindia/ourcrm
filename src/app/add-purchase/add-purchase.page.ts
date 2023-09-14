import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPurchasePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
