import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-ccstep4',
  templateUrl: './ccstep4.page.html',
  styleUrls: ['./ccstep4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule,ReactiveFormsModule]
})
export class Ccstep4Page implements OnInit {
bname:string='';
accno:string='';
ifsc:string='';
branchname:string='';
upiid:string='';

  form:any;
submitted=false;
  constructor(private router:Router,private formBuilder:FormBuilder) { 
    this.form= this.formBuilder.group({
      bname:['',[Validators.required]],
      accno:[''],
      ifsc:[''],
      branchname:[''],
      upiid:[''],
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
    this.router.navigate(['/ccstep2']); 
  }

}
