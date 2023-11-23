import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule]
})
export class ReceiptPage implements OnInit {
  @ViewChild('popover') popover:any
  ;

  constructor(private router:Router) { }
  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  onSubmit(){

  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }

}
