import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-leaddashboard',
  templateUrl: './leaddashboard.page.html',
  styleUrls: ['./leaddashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,],
 
})
export class LeaddashboardPage implements OnInit {

  menuType = 'push';
  public number: number = 1000;
  selectedOptions: string[] = [];


  dataTable = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000]
  ]
  lead$: Observable<any[]>;
  totallead: number=0;

  constructor(private encService: EncryptionService,private leadser:LeadService,) {
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads (encService.encrypt(compid), '', '');

    this.lead$.subscribe(data => {
      console.log(data);
      this.totallead=data.length // Log the data to the console to verify if it's being fetched
    });
  }

ngOnInit() {

}

}




