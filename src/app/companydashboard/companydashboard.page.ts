import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.page.html',
  styleUrls: ['./companydashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CompanydashboardPage implements OnInit {
  username: string = 'Abhishek Pareek';
  companyname:string='Neelkanth Technologies';
  notificationCount: number = 5; // Replace this with the actual notification count
  openNotificationsPage() {
    // Implement your logic to open the notifications page or handle notifications
    // You may want to reset the notification count after viewing the notifications
    this.notificationCount = 0;
  }
  constructor(private navCtrl: NavController,private session:SessionService,) { }

  ngOnInit() {
     //this.username=await this.session.getValue('username');
    //this.companyname=await this.session.getValue('companyname');

    const compid = '1';
  }
  logout() {
    // Clear authentication tokens or perform other logout logic
   // this.authService.logout();

    // Navigate to the login page (assuming your login page has a route named 'login')
    this.navCtrl.navigateRoot('/login');
  }
}
