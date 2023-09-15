import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-hsn-manager',
  templateUrl: './hsn-manager.page.html',
  styleUrls: ['./hsn-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HsnManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
