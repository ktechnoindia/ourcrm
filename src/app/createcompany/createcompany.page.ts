import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule],
  providers: [DatePipe],

})
export class CreatecompanyPage implements OnInit {
  rdate:string | undefined ='' ;

  constructor(private router:Router,private datePipe: DatePipe,
    ) 
    {
      this.rdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString();

     }
     getCurrentDate(){
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}