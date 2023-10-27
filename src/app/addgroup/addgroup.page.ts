import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddgroupService,group } from '../services/addgroup.service';
import { Observable, Subscription } from 'rxjs';

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
  parentgroup:number=0; 
  subscription: Subscription = new Subscription();
  itemgroups$: Observable<any[]>



  constructor(private router:Router,private formBuilder:FormBuilder,private groupService:AddgroupService) {
    this.form = this.formBuilder.group({
      igname: ['', [Validators.required]],
      agname: [''],
      description: [''],
      parentgroup:[''],

  })
  this.itemgroups$ = this.groupService.getAllGroups(1);

   }

   onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let groupdata:group={
      itemgroupname: this.form.value.igname, 
      parentgroupid: this.form.value.parentgroup,
      companyid: 1,
    };
    this.subscription=this.groupService.createGroup(groupdata,'','').subscribe(
      (response: any) => {
       if(response.status){
        console.log('POST request successful', response);
       }
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
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
  }  }

}