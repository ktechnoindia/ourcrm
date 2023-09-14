import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MasterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
