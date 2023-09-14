import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.page.html',
  styleUrls: ['./view-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewSalePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
