import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-update-quot',
  templateUrl: './update-quot.page.html',
  styleUrls: ['./update-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdateQuotPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}