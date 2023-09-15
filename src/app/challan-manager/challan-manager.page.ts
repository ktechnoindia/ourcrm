import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-challan-manager',
  templateUrl: './challan-manager.page.html',
  styleUrls: ['./challan-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChallanManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
