import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [DatePipe],

})
export class ReceiptPage implements OnInit {
  @ViewChild('popover') popover:any
  ;
  receiptdate:string='';


  constructor(private datePipe: DatePipe,private router:Router) { }
  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  onSubmit(){

  }

  ngOnInit() {
    this.receiptdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

  }

  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }

}
