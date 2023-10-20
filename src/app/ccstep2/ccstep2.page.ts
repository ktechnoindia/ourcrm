import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { IndustrytypeService } from '../services/industrytype.service';
import { CgsttypeService } from '../services/cgsttype.service';
import { BusinesstypeService } from '../services/businesstype.service';
import { SegmentService } from '../services/segment.service';

@Component({
  selector: 'app-ccstep2',
  templateUrl: './ccstep2.page.html',
  styleUrls: ['./ccstep2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule]
})
export class Ccstep2Page implements OnInit {
industry$:any;
selectindustry:string = '';
industry!:string;
companytype$:any;
companytype!:string;
businesstype$:any;
businesstype!:string;
segmenttype$:any;
segmenttype!:string;
  constructor(private router:Router,private industry1:IndustrytypeService,private cmptype:CgsttypeService,private bustype:BusinesstypeService,private segment1:SegmentService) {
   this.industry$=this.industry1.getindustrytype();
   this.companytype$=this.cmptype.getcgtype();
   this.businesstype$=this.bustype.getbusinesstype();
   this.segmenttype$=this.segment1.getsegments();
   }
  


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/createcompany']); 
  }

}