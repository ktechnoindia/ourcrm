import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private alertController: AlertController) { }
  async validateForm(fields: { [key: string]:any }): Promise<boolean> {
    for (const key in fields) {
      if (fields[key].trim() === '') {
        await this.showAlert('Error !', 'Please fill required fields.');
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
}
