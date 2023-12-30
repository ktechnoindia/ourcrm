import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-attribute-modal',
  templateUrl: './attribute-modal.page.html',
  styleUrls: ['./attribute-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AttributeModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
