import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IndustrytypeService } from '../services/industrytype.service';
import { CgsttypeService } from '../services/cgsttype.service';
import { BusinesstypeService } from '../services/businesstype.service';
import { SegmentService } from '../services/segment.service';

@Component({
  selector: 'app-ccstep2',
  templateUrl: './ccstep2.page.html',
  styleUrls: ['./ccstep2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule,ReactiveFormsModule]
})
export class Ccstep2Page implements OnInit {

  // industry:string='';
  // business:string='';
  // segment:string='';
  // company:string='';
  // gsttax:string='';
  // tanumber:string='';
  // pannumber:string='';
form:any;
submitted=false;
  constructor(private router:Router,private formBuilder:FormBuilder) {
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
  

    this.form= this.formBuilder.group({
      industry:['',[Validators.required]],
      business:['',[Validators.required]],
      segment:['',[Validators.required]],
      company:['',[Validators.required]],
      gsttax:['',[Validators.required]],
      pannumber:[''],
      tanumber:['']
    })
   }

onSubmit(){
  if(this.form.valid){
    console.log('selected Value'+ this.form.value);
  }else{
    Object.keys(this.form.controls).forEach(controlName =>{
      const control = this.form.get(controlName);
      if(control.invalid){
        control.markAsTouched();
      }
    })
  }
}
  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/createcompany']); 
  }

}