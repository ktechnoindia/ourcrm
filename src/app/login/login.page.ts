import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Validators,FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements OnInit{
  
  RegisterFrom:FormGroup;



  constructor(private formBuilder: FormBuilder) {
    this.RegisterFrom = this.formBuilder.group({
      email : new FormControl('' ,[
        Validators.email,
        Validators.required
      ]),
      phone : new FormControl('',[
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/),
      ])
    });
    
  }
  onSubmit(){
    if (this.RegisterFrom.valid) {
      
      const emailValue = this.RegisterFrom.value.email;
      const phoneValue = this.RegisterFrom.value.phone;
      console.log('Email:', emailValue);
      console.log('Phone:', phoneValue);
    }
  
  }

  ngOnInit() {
    
  }

}






