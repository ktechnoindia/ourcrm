import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-viewledgergroup',
  templateUrl: './viewledgergroup.page.html',
  styleUrls: ['./viewledgergroup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewledgergroupPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
