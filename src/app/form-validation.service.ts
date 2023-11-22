import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private alertController: AlertController,private loadingController:LoadingController ) { }
  async validateForm(fields: { [key: string]:any }): Promise<boolean> {
    for (const key in fields) {
      if (fields[key].trim() === '') {
        // await this.showAlert('Error !', 'Please fill required fields.');
        return false;
      }
    }
    return true;
  }

  async showSuccessAlert() {
    await this.showAlert('Success !', 'Form submitted successfully.');
  }

  async showFailedAlert() {
    await this.showAlert('Error !', "Form don't successfully.");
  }

  async showAlert(header:string,message:string) : Promise<void>{
       const alert = await this.alertController.create({
        header,
        message,
        buttons:[{
          text:'OK',
          cssClass:'custom-alert-button secondary'
        }],
        cssClass:'my-custom-alert',
       });
       await alert.present(); 
  }
  
  showSaveLoader() {
    
    this.loadingController.create({
      message:"Saveing",
      duration: 500,
      spinner:'crescent'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log(dis);
      });
    });

  }

  shoErrorLoader() {
    
    this.loadingController.create({
      message:"",
      duration: 500,
      spinner:'crescent'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log(dis);
      });
    });

  }
 
  
 
}
