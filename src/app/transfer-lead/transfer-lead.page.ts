import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ExecutiveService } from '../services/executive.service';
import { NavController } from '@ionic/angular';
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

  searchTerm: string = '';
  filteredTransferlead$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private router: Router,private navCtrl:NavController,private execut:ExecutiveService,private encService: EncryptionService,private leadser:LeadService,) { 
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads (encService.encrypt(compid), '', '');
    this.executive$ = this.execut.getexecutive();

  }

 
  filterCustomers(): Observable<any[]> {
    return this.lead$.pipe(
      map(leads =>
        leads.filter(lead =>
          Object.values(lead).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredTransferlead$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredTransferlead$ = this.lead$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
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
