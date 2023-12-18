import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormValidationService } from '../form-validation.service';
import { RoleassignService,roleassign } from '../services/roleassign.service';

@Component({
  selector: 'app-roleassign',
  templateUrl: './roleassign.page.html',
  styleUrls: ['./roleassign.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
  ReactiveFormsModule]})
export class RoleassignPage implements OnInit {
all_sale:boolean=false;
new_sale :boolean=false;
view_sale :boolean=false;
edit_sale:boolean=false;
delete_sale:boolean=false;
print_sale:boolean=false;
all_purchase:boolean=false;
new_purchase:boolean=false;
view_purchase:boolean=false;
edit_purchase:boolean=false;
delete_purchase:boolean=false;
print_purchase:boolean=false;
all_quote:boolean=false;
new_quote:boolean=false;
view_quote:boolean=false;
edit_quote:boolean=false;
delete_quote:boolean=false;
print_quote:boolean=false;
all_challan:boolean=false;
new_challan:boolean=false;
view_challan:boolean=false;
edit_challan:boolean=false;
delete_challan:boolean=false;
print_challan:boolean=false;
all_lms:boolean=false;
new_lms:boolean=false;
view_lms:boolean=false;
edit_lms:boolean=false;
delete_lms:boolean=false;
print_lms:boolean=false;
all_amc:boolean=false;
new_amc:boolean=false;
view_amc:boolean=false;
edit_amc:boolean=false;
delete_amc:boolean=false;
print_amc:boolean=false;

  myform: FormGroup;

  constructor(private navCtrl: NavController,private router: Router, private formService: FormValidationService,private roleService:RoleassignService,private formBuilder:FormBuilder) { 
    this.myform = formBuilder.group({
      all_sale: [false],
      new_sale: [false],
      view_sale: [false],
      edit_sale: [false],
      delete_sale: [false],
      print_sale: [false],
      all_purchase: [false],
      new_purchase: [false],
      view_purchase: [false],
      edit_purchase: [false],
      delete_purchase: [false],
      print_purchase: [false],
      all_quote: [false],
      new_quote: [false],
      view_quote: [false],
      edit_quote: [false],
      delete_quote: [false],
      print_quote: [false],
      all_challan: [false],
      new_challan: [false],
      view_challan: [false],
      edit_challan: [false],
      delete_challan: [false],
      print_challan: [false],
      all_lms: [false],
      new_lms: [false],
      view_lms: [false],
      edit_lms: [false],
      delete_lms: [false],
      print_lms: [false],
      all_amc: [false],
      new_amc: [false],
      view_amc: [false],
      edit_amc: [false],
      delete_amc: [false],
      print_amc: [false],
    })
  }
  onNew() {
    location.reload();
  }
   onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  async onSubmit() {
    
      console.log('Your form data : ', this.myform.value);
      let roledata: roleassign = {
        all_sale: this.myform.value.all_sale,
        new_sale: this.myform.value.new_sale,
        view_sale: this.myform.value.view_sale,
        edit_sale: this.myform.value.edit_sale,
        delete_sale: this.myform.value.delete_sale,
        print_sale: this.myform.value.print_sale,
        all_purchase: this.myform.value.all_purchase,
        new_purchase: this.myform.value.new_purchase,
        view_purchase: this.myform.value.view_purchase,
        edit_purchase: this.myform.value.edit_purchase,
        delete_purchase: this.myform.value.delete_purchase,
        print_purchase: this.myform.value.print_purchase,
        all_quote: this.myform.value.all_quote,
        new_quote: this.myform.value.new_quote,
        view_quote: this.myform.value.view_quote,
        edit_quote: this.myform.value.edit_quote,
        delete_quote: this.myform.value.delete_quote,
        print_quote: this.myform.value.print_quote,
        all_challan: this.myform.value.all_challan,
        new_challan: this.myform.value.new_challan,
        view_challan: this.myform.value.view_challan,
        edit_challan: this.myform.value.edit_challan,
        delete_challan: this.myform.value.delete_challan,
        print_challan: this.myform.value.print_challan,
        all_lms: this.myform.value.all_lms,
        new_lms: this.myform.value.new_lms,
        view_lms: this.myform.value.view_lms,
        edit_lms: this.myform.value.edit_lms,
        delete_lms: this.myform.value.delete_lms,
        print_lms: this.myform.value.print_lms,
        all_amc: this.myform.value.all_amc,
        new_amc: this.myform.value.new_amc,
        view_amc: this.myform.value.view_amc,
        edit_amc: this.myform.value.edit_amc,
        delete_amc: this.myform.value.delete_amc,
        print_amc: this.myform.value.print_amc
      };

      this.roleService.createRoleassign(roledata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
        },
        (error: any) => {
          console.error('POST request failed', error);
        }
      );
    
  }


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/setting']); // Navigate back to the previous page
  }
}
