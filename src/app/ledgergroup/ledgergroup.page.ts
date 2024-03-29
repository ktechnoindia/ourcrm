import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddgroupService, group } from '../services/addgroup.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { GsttypeService } from '../services/gsttype.service';
import { LedgergroupService } from '../services/ledgergroup.service';
import { SessionService } from '../services/session.service';

interface Group {
  groupname: string;
  parentgroup: string;
  companyid: number;
}

@Component({
  selector: 'app-ledgergroup',
  templateUrl: './ledgergroup.page.html',
  styleUrls: ['./ledgergroup.page.scss'],
  standalone: true,
  imports: [RouterLink,IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,})
export class LedgergroupPage implements OnInit {
  form: FormGroup;
  groupname: string = '';
  parentgroup: string = '';

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  subscription: Subscription = new Subscription();
  itemgroups$: Observable<any[]>
  filteredGroups$: Observable<any[]> = new Observable<any[]>();

  // step1: boolean = false;
  // step2: boolean = false;
  // selectGst$: Observable<any[]>;
  // selectGst: number = 0;
  // account_number: string = "";
  // ifsc_code: string = '';
  // bank_name: string = '';
  // branch_name: string = '';
  constructor( public session: SessionService,private ledgrpservice:LedgergroupService, private gstsrvs: GsttypeService,private navCtrl: NavController, private router: Router, private formBuilder: FormBuilder, private formService: FormValidationService) {
    const compid = this.session.getValue('userid')?.valueOf() as number;
    this.itemgroups$ = this.ledgrpservice.getledgerGroups(compid);
    this.form = this.formBuilder.group({

      groupname: ['', Validators.required],
      parentgroup: [''],
   
      // selectGst: [''],
      // account_number: ['', Validators.pattern(/^\d{9,18}$/)], // Account number validation (between 9 and 18 digits)
      // ifsc_code: ['', Validators.pattern(/^[A-Za-z]{4}\d{7}$/)], // IFSC code validation (4 alphabets + 7 digits)
      // bank_name: [''],
      // branch_name: [''],
    })
  
    // this.selectGst$ = this.gstsrvs.getgsttype();

  }
  async onSubmit() {
    const fields = { groupname: this.groupname }
    const companyid = 1
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.form.value);
      const ledgergroupdata: Group = {
        groupname: this.form.value.ledgrpname,
        parentgroup: this.form.value.parentgroup,
        companyid: companyid,
      };
      
      this.subscription = this.ledgrpservice.createledgerGroup(ledgergroupdata, '', '').subscribe(
        (response: any) => {
          if (response.status) {
            console.log('POST request successful', response);
          }
          this.formService.showSuccessAlert();
          this.form.reset();

        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
      this.form.reset();

    } else {
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
  onNew() {
    location.reload();
  }

 
  ngOnInit() {
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.form.reset();
      }
    });
  }
  goBack() {
    this.router.navigate(['/item-master']);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // toggleStep1() {
  //   this.step1 = !this.step1;
  // }
  // toggleStep2() {
  //   this.step2 = !this.step2;
  // }
}
