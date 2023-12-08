import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { RoleofexecutiveService,roleofexecut } from '../services/roleofexecutive.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-viewroleofexicutive',
  templateUrl: './viewroleofexicutive.page.html',
  styleUrls: ['./viewroleofexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
  ReactiveFormsModule]})
export class ViewroleofexicutivePage implements OnInit {
  roleexectives$: Observable<any[]>;

  constructor(private router:Router,private roleexectService:RoleofexecutiveService,private encService:EncryptionService) { 

    const compid='1';

    this.roleexectives$ = this.roleexectService.fetchroleexecutive(encService.encrypt(compid),'','');
    console.log(this.roleexectives$);
  
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/viewroleofexicutive']); 
  }
  
}
