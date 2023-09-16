import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.page.html',
  styleUrls: ['./item-master.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemMasterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
