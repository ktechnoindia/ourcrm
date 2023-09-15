import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-quot',
  templateUrl: './add-quot.page.html',
  styleUrls: ['./add-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddQuotPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
