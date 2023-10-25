import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LegderService, ledg } from '../services/legder.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class LedgerPage implements OnInit {

  name:string='';
  group_name:string='';
  address:string='';
  alternate_name:string='';
  vender_code:string='';
  gstin:string='';
  opening_balance:string='';
  closing_balance:string='';
  

  form:any;
  submitted=false;

  constructor(private router:Router, private formBuilder:FormBuilder,private ledgService:LegderService) { 
    this.form = this.formBuilder.group({
      name:['',[Validators.required]],
      group_name:['',[Validators.required]],
      address:['',[Validators.required]],
      alternate_name:[''],
      vender_code:[''],
      gstin:[''],
      opening_balance:[''],
      closing_balance:[''],
    })
  }

  onSubmit(form: NgForm) {
    if (this.form) {
    console.log('Your form data : ', form.value);
    let ledgdata:ledg={
      name: form.value.name,
      group_name: form.value.group_name,
      address: form.value.address,
      alternate_name: form.value.alternate_name,
      vender_code: form.value.vender_code,
      gstin: form.value.gstin,
      opening_balance: form.value.opening_balance,
      closing_balance: form.value.closing_balance,
    };
    this.ledgService.createLdeger(ledgdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  } else {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control.invalid) {
        control.markAsTouched();
      }
    })
  }
}
  

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}
