import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sales-manager',
  templateUrl: './sales-manager.page.html',
  styleUrls: ['./sales-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class SalesManagerPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/master"])
}

}
