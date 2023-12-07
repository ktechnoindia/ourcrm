import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewroleassign',
  templateUrl: './viewroleassign.page.html',
  styleUrls: ['./viewroleassign.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewroleassignPage implements OnInit {
    
  modules = [
    { name: 'All' },

    { name: 'Sales' },
    { name: 'Purchase' },
    { name: 'Quotation' },
    { name: 'Challan' },
    { name: 'LMS' },
    { name: 'AMC' },
    { name: 'Sales' },
  ];
  constructor(private router: Router,) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }
}
