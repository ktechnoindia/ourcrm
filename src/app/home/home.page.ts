import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class HomePage implements OnInit {

  constructor(private sharedService: SharedService,private router:Router) { }

  ngOnInit() {
    this.sharedService.showHeader  = false;

  }
  goDemo() {
    this.router.navigate(['/masterdashboard']); // Navigate back to the previous page
  }
}
