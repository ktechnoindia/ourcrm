import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generalledger',
  templateUrl: './generalledger.page.html',
  styleUrls: ['./generalledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GeneralledgerPage implements OnInit {
  constructor(private router :Router) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/add-customer"])
  }


}
