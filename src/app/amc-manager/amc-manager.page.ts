import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-amc-manager',
  templateUrl: './amc-manager.page.html',
  styleUrls: ['./amc-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AmcManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
