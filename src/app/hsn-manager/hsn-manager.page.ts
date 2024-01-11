
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HsnService,hsn } from '../services/hsn.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { FormValidationService } from '../form-validation.service';

@Component({
  selector: 'app-hsn-manager',
  templateUrl: './hsn-manager.page.html',
  styleUrls: ['./hsn-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HsnManagerPage implements OnInit {
  hsncode: string='';
  unit:string='';
  // desc: string = '';
  form: FormGroup;

  hsncode$: Observable<any[]>
  searchTerm: string = '';
  filteredHsncodes$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private navCtrl: NavController,private router: Router,private formService:FormValidationService, private formBuilder:FormBuilder,private hsnService:HsnService,private toastCtrl: ToastController) { 
    this.form = this.formBuilder.group({
      hsncode: ['', [Validators.required]],
      unit: [''],
      // desc: [''],
      searchTerm:['']
  })
  this.hsncode$ = this.hsnService.getHSNNames(1);
  }

  async onSubmit() {
    const fields = {hsncode:this.hsncode,}
    const isValid = await this.formService.validateForm(fields);
    if ( await this.formService.validateForm(fields)){
    console.log('Your form data : ', this.form.value);
    let hsndata:hsn={
     hsncode:this.form.value.hsncode,
     unit:this.form.value.unit,
    //  desc:this.form.value.desc,
     companyid: 1,
    };
   this.hsnService.createHSN(hsndata,'','').subscribe(
      (response: any) => {
       if(response.status){
        console.log('POST request successful', response);
       }
        this.formService.showSuccessAlert();

      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
   
  } else{
    Object.keys(this.form.controls).forEach(controlName =>{
      const control = this.form.get(controlName);
      if(control?.invalid){
        control.markAllAsTouched();
      }
    })
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
  return this.hsncode$.pipe(
    map(hsncodes =>
      hsncodes.filter(hsn =>
        Object.values(hsn).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
    )
  );
}

onSearchTermChanged(): void {
  this.filteredHsncodes$ = this.filterCustomers();
}

ngOnInit() {
  this.filteredHsncodes$ = this.hsncode$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this.filterCustomers())
  );
}

  goBack() {
    this.router.navigate(['/item-master']); 
  }
 

}