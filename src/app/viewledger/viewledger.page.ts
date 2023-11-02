import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LegderService } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-viewledger',
  templateUrl: './viewledger.page.html',
  styleUrls: ['./viewledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewledgerPage implements OnInit {


  ledgers$: Observable<any[]>
  
  constructor(private router:Router,private ledgerService:LegderService , private encService:EncryptionService) { 
    const compid='1';

    this.ledgers$ = this.ledgerService.fetchAllLedger(encService.encrypt(compid),'','');
    console.log(this.ledgers$);
  }

  onSubmit(){
    
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/ledger']); // Navigate back to the previous page
  }

}
