import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-transfer-lead',
  templateUrl: './transfer-lead.page.html',
  styleUrls: ['./transfer-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransferLeadPage implements OnInit {
  lead$: Observable<any[]>;

  constructor(private router: Router,private encService: EncryptionService,private leadser:LeadService,) { 
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads (encService.encrypt(compid), '', '');
  }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/leaddashboard"])
  }

}
