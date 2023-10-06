import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-hsn-manager',
  templateUrl: './hsn-manager.page.html',
  styleUrls: ['./hsn-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HsnManagerPage implements OnInit {
  hsnCode: number | null = null;
  unit: number | null = null;
  desc: string = '';

  constructor(private router: Router, private toastCtrl: ToastController) { }

  async onSubmit() {
    if (this.hsnCode === null) {
      const toast = await this.toastCtrl.create({
        message: "HSN Code is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.unit===null){
      const toast = await this.toastCtrl.create({
        message: "Unit is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.desc===''){
      const toast = await this.toastCtrl.create({
        message: "Description is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else{
        const toast = await this.toastCtrl.create({
          message: "Successffully",
          duration: 3000,
          color: 'success'
        });
        toast.present();
    }
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/master"])
  }

}
