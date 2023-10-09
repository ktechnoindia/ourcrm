import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-opencompany',
  templateUrl: './opencompany.page.html',
  styleUrls: ['./opencompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OpencompanyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
