import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddattributeService, addattribute } from '../services/addattribute.service';
import { FormValidationService } from '../form-validation.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-addattribute',
  templateUrl: './addattribute.page.html',
  styleUrls: ['./addattribute.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddattributePage implements OnInit {

  attname: string = '';
  companyid: number = 1;
  myform: FormGroup;

  attnames: any[] = [];
  searchTerm: string = '';
  filteredAttributes: any[] = [];
  attname$: Observable<any[]>

  constructor(private navCtrl: NavController,private router: Router, private addatt: AddattributeService, private formService: FormValidationService, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.myform = this.formBuilder.group({
      attname: ['', Validators.required],
      searchTerm:['']
    })
    this.myaction();
    this.attname$ = this.addatt.getattribute(1);

  }
  async myaction(){
    this.addatt.getattribute(1).subscribe((response:any)=>{
      this.attnames=response;
      this.filteredAttributes = this.attnames;
      console.log('>>>>>'+this.filteredAttributes);
  }, (error) => {                              //Error callback
    console.log('error caught in component'+error.message) 
  });  
  }

  async onSubmit() {
    const fields = {attname: this.attname}
    // const isValid = await this.formService.validateForm(fields);
    console.log('Your form data : ', this.myform.value);
    if (true) {

      
      let attdata: addattribute = {
        attname: this.myform.value.attname,
        companyid: 1
      };
      this.addatt.createAttribute(attdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
          this.myaction();

          this.myform.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
      setTimeout(() => {
        this.myform.reset();
      }, 1000);
    } else {
      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
        if (control?.invalid) {
          control.markAllAsTouched()
        }
      })
    }

  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  onNew(){
    //location.reload();
  }

  filterCustomers(): Observable<any[]> {
    return this.attname$.pipe(
      map(attiributename =>
        attiributename.filter(attribute =>
          Object.values(attribute).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredAttributes = this.attnames;
  }
 
  ngOnInit() {
    this.myaction();
    this.attname$ = this.attname$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });
  }

  goBack() {
    this.router.navigate(['/item-master']);
  }

}
