import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, concatMap, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { CreatecompanyService } from '../services/createcompany.service';
import { NavigationExtras } from '@angular/router';
import { SessionService } from '../services/session.service';
import { formatDate } from '@angular/common';
// import { Subscription } from 'rxjs';


@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.page.html',
  styleUrls: ['./viewcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewcompanyPage implements OnInit {

  formDate: string = '';
  toDate: string = '';
  companys$: Observable<any[]>

  filteredCompany$: Observable<any[]> = new Observable<any[]>();
  searchTerm: string = '';

  constructor(private alertController: AlertController, public session: SessionService, private companyService: CreatecompanyService, private router: Router, private toastCtrl: ToastController, private encService: EncryptionService) {
    const compid = '1';
    this.companys$ = this.companyService.fetchallcompany(compid, '', '');
    console.log(this.companys$);
  }

  filterCustomers(): Observable<any[]> {
    return this.companys$.pipe(
      map(companies =>
        companies.filter(company =>
          Object.values(company).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this. filteredCompany$ = this.filterCustomers();
  }

  ngOnInit() {
    this. filteredCompany$ = this.companys$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }


  ///edit company start
  editcompany(company: any) {
    console.log(company);
    let navigationExtras: NavigationExtras = {
      state: {
        company: company,
        edit: true
      }
    };
    this.router.navigate(['createcompany'], navigationExtras);

  }
  async openToast(msg: string) {
    this.session.openToast(msg);
  }



  goBack() {
    this.router.navigate(["/createcompany"])
  }
}
