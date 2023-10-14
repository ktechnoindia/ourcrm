import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-closecompany',
  templateUrl: './closecompany.page.html',
  styleUrls: ['./closecompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClosecompanyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}