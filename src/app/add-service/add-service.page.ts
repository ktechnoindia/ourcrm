import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddServicePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
