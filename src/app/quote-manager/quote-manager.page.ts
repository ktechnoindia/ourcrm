import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-quote-manager',
  templateUrl: './quote-manager.page.html',
  styleUrls: ['./quote-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class QuoteManagerPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/master"])
  }

}
