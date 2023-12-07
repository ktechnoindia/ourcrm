import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-roleassign',
  templateUrl: './roleassign.page.html',
  styleUrls: ['./roleassign.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
  ReactiveFormsModule]})
export class RoleassignPage implements OnInit {
  id: number=0;
  name: string='';
  assignedModules: string=''; 

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/setting']); // Navigate back to the previous page
  }
}
