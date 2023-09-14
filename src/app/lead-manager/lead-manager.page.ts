import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lead-manager',
  templateUrl: './lead-manager.page.html',
  styleUrls: ['./lead-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LeadManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
