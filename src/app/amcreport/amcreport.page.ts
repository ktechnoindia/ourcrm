import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AmcService } from '../services/amc.service';
import { FormValidationService } from '../form-validation.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-amcreport',
  templateUrl: './amcreport.page.html',
  styleUrls: ['./amcreport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AmcreportPage implements OnInit {
  formDate:string='';
  toDate:string='';
  amc$: Observable<any[]>;



  constructor(private router: Router,private amcService:AmcService,private formService: FormValidationService,private encService: EncryptionService,) { 
    const compid='1'
    this.amc$ = this.amcService.fetchallAmc(encService.encrypt(compid),'','');
   console.log(this.amc$);
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/amc-manager']); // Navigate back to the previous page
  }
}
