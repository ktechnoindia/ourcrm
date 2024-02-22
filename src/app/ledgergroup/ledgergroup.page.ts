import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddgroupService, group } from '../services/addgroup.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { GsttypeService } from '../services/gsttype.service';


@Component({
  selector: 'app-ledgergroup',
  templateUrl: './ledgergroup.page.html',
  styleUrls: ['./ledgergroup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,})
export class LedgergroupPage implements OnInit {
  form: FormGroup;
  ledgrpname: string = '';
  parentgroup: number = 0;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  subscription: Subscription = new Subscription();
  itemgroups$: Observable<any[]>
  filteredGroups$: Observable<any[]> = new Observable<any[]>();

  step1: boolean = false;
  step2: boolean = false;
  selectGst$: Observable<any[]>;
  selectGst: number = 0;
  account_number: string = "";
  ifsc_code: string = '';
  bank_name: string = '';
  branch_name: string = '';
  constructor( private gstsrvs: GsttypeService,private navCtrl: NavController, private router: Router, private formBuilder: FormBuilder, private formService: FormValidationService, private groupService: AddgroupService) {
    this.form = this.formBuilder.group({

      ledgrpname: ['', Validators.required],
      parentgroup: [''],
      selectGst: [''],
      account_number: ['', Validators.pattern(/^\d{9,18}$/)], // Account number validation (between 9 and 18 digits)
      ifsc_code: ['', Validators.pattern(/^[A-Za-z]{4}\d{7}$/)], // IFSC code validation (4 alphabets + 7 digits)
      bank_name: [''],
      branch_name: [''],
    })
    const compid = 1
    this.itemgroups$ = this.groupService.getAllGroups(compid);
    this.selectGst$ = this.gstsrvs.getgsttype();

  }
  async onSubmit() {
    const fields = { ledgergroupname: this.ledgrpname }
    const companyid = 1
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.form.value);
      let groupdata: group = {
        // ledgrpname: this.form.value.ledgrpname,
        parentgroupid: this.form.value.parentgroup,
        companyid: companyid,
        itemgroupname: '',
        // account_number: this.form.value.account_number,
        //  ifsc_code: this.form.value.ifsc_code,
        //  bank_name: this.form.value.bank_name,
        //   branch_name: this.form.value.branch_name,
      };
      this.subscription = this.groupService.createGroup(groupdata, '', '').subscribe(
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
  toggleStep1() {
    this.step1 = !this.step1;
  }
  toggleStep2() {
    this.step2 = !this.step2;
  }
}
