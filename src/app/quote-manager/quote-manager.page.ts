import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quote-manager',
  templateUrl: './quote-manager.page.html',
  styleUrls: ['./quote-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QuoteManagerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
