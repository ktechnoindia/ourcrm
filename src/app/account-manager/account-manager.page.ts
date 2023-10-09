import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.page.html',
  styleUrls: ['./account-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountManagerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
}
