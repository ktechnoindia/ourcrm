import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.page.html',
  styleUrls: ['./add-prospect.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddProspectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
