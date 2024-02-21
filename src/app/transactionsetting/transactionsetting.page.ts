import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-transactionsetting',
  templateUrl: './transactionsetting.page.html',
  styleUrls: ['./transactionsetting.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransactionsettingPage implements OnInit {

  selectedOption: string = ''; // Add this line to define the property
  myForm: any;

  toggleDivs() {
    // Add your logic for toggling divs based on selectedOption
    // For simplicity, I'm just logging the selected option for now
    console.log('Selected Option:', this.selectedOption);
  }
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myForm.reset();
      }
    });
  
  }
  goBack(){
    this.router.navigate(["/transcationdashboard"])
  }
}
