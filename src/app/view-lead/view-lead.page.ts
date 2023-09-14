import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.page.html',
  styleUrls: ['./view-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewLeadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
