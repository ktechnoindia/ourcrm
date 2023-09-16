import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-view-executive',
  templateUrl: './view-executive.page.html',
  styleUrls: ['./view-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewExecutivePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
