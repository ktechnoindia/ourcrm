import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.page.html',
  styleUrls: ['./gst.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GstPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
