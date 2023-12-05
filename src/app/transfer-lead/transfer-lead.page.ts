import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { Observable } from 'rxjs';
import { ExecutiveService } from '../services/executive.service';
@Component({
  selector: 'app-transfer-lead',
  templateUrl: './transfer-lead.page.html',
  styleUrls: ['./transfer-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransferLeadPage implements OnInit {
  lead$: Observable<any[]>;
  executive$: Observable<any>;
  select_sales_person:number=0;
  constructor(private router: Router,private execut:ExecutiveService,private encService: EncryptionService,private leadser:LeadService,) { 
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads (encService.encrypt(compid), '', '');
    this.executive$ = this.execut.getexecutive();

  }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/leaddashboard"])
  }
// Inside your component class
updateCatPerson(leadscore: any) {
  const selectedExecutiveId = leadscore.select_sales_person;

  // Subscribe to the Observable to get the actual data
  this.executive$.subscribe((executives: any[]) => {
    // Find the corresponding executive
    const selectedExecutive = executives.find(exe => exe.executiveid === selectedExecutiveId);

    // Update the leadscore.catPerson with the selected executive's name
    leadscore.catPerson = selectedExecutive ? selectedExecutive.executivename : '';
  });
}
}
