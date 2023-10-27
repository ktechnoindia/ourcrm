import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddgroupService,group } from '../services/addgroup.service';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.page.html',
  styleUrls: ['./addgroup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddgroupPage implements OnInit {

  form:FormGroup;

  igname:string='';
  agname:string='';
  description:string='';
  parentgroup:string='';

  constructor(private router:Router,private formBuilder:FormBuilder,private groupService:AddgroupService) {
    this.form = this.formBuilder.group({
      igname: ['', [Validators.required]],
      agname: [''],
      description: [''],
      parentgroup:[''],
  })
   }

   onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let groupdata:group={
      igname: this.form.value.igname,
      agname: this.form.value.agname,
      description: this.form.value.description,
    };
    this.groupService.createGroup(groupdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  } 
}

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}