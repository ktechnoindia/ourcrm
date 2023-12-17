import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-maindashborad',
  templateUrl: './maindashborad.page.html',
  styleUrls: ['./maindashborad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MaindashboradPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
