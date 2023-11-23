import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router,RouterLink } from '@angular/router';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ReceiptPage implements OnInit {

  constructor(private router:Router) { }

  onSubmit(){

  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }

}
