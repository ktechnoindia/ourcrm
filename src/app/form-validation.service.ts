import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  showErrorLoader() {
    throw new Error('Method not implemented.');
  }


  constructor(private alertController: AlertController,private loadingController:LoadingController ) { }
  async validateForm(fields: { [key: string]: any }): Promise<boolean> {
    for (const key in fields) {
      // Check if the value is a string before calling trim
      if (typeof fields[key] === 'string' && fields[key].trim() === '') {
        // await this.showAlert('Error!', 'Please fill required fields.');
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
  async showErrorPopup(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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