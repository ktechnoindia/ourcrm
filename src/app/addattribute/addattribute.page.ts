import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-addattribute',
  templateUrl: './addattribute.page.html',
  styleUrls: ['./addattribute.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddattributePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
