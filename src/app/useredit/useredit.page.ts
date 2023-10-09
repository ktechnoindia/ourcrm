import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.page.html',
  styleUrls: ['./useredit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsereditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
