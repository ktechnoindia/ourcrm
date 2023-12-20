import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddgroupService,group } from '../services/addgroup.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { FormValidationService } from '../form-validation.service';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.page.html',
  styleUrls: ['./addgroup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddgroupPage implements OnInit {

  form:FormGroup;
  itemgroupname:string='';
  parentgroup:number=0; 
  
  subscription: Subscription = new Subscription();
  itemgroups$: Observable<any[]>
  searchTerm: string = '';
  filteredGroups$: Observable<any[]> = new Observable<any[]>(); 

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private navCtrl: NavController,private router:Router,private formBuilder:FormBuilder, private formService: FormValidationService,private groupService:AddgroupService) {
    this.form = this.formBuilder.group({
    
      itemgroupname:['',Validators.required],
      parentgroup:[''],
      searchTerm:['']

  })
  
  this.itemgroups$ = this.groupService.getAllGroups(1);

   }

   async onSubmit() {
    const fields = {groupname:this.itemgroupname}
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
    console.log('Your form data : ', this.form.value);
    let groupdata:group={
      itemgroupname: this.form.value.itemgroupname, 
      parentgroupid: this.form.value.parentgroup,
      companyid: 1,
    };
    this.subscription=this.groupService.createGroup(groupdata,'','').subscribe(
      (response: any) => {
       if(response.status){
        console.log('POST request successful', response);
       }
        this.formService.showSuccessAlert();
        location.reload()
      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
    setTimeout(() => {
      // Reset the form and clear input fields
      this.form.reset();
    }, 1000); 
  }   else {
    //If the form is not valid, display error messages
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
    if (this.firstInvalidInput) {
      this.firstInvalidInput.setFocus();
    }
  }
}
onButtonClick() {
  // Add any additional logic you may need before closing the page
  this.navCtrl.back(); // This will navigate back to the previous page
}
onNew(){
  location.reload();
}

filterCustomers(): Observable<any[]> {
  return this.itemgroups$.pipe(
    map(groups =>
      groups.filter(group =>
        Object.values(group).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
    )
  );
}

onSearchTermChanged(): void {
  this.filteredGroups$ = this.filterCustomers();
}

ngOnInit() {
  this.filteredGroups$ = this.itemgroups$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this.filterCustomers())
  );
}
  goBack() {
    this.router.navigate(['/item-master']); 
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
  }  }

}