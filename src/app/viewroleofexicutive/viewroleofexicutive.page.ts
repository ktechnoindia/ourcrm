import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { RoleofexecutiveService, roleofexecut } from '../services/roleofexecutive.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
@Component({
  selector: 'app-viewroleofexicutive',
  templateUrl: './viewroleofexicutive.page.html',
  styleUrls: ['./viewroleofexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
    ReactiveFormsModule]
})
export class ViewroleofexicutivePage implements OnInit {
  roleexectives$: Observable<any[]>;
  searchTerm: string = '';
  filteredRoleExecutives$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private router: Router, private roleexectService: RoleofexecutiveService, private encService: EncryptionService) {

    const compid = '1';

    this.roleexectives$ = this.roleexectService.fetchroleexecutive(encService.encrypt(compid), '', '');
    console.log(this.roleexectives$);

  }

  filterCustomers(): Observable<any[]> {
    return this.roleexectives$.pipe(
      map(roleexecutive =>
        roleexecutive.filter(roleexcut =>
          Object.values(roleexcut).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredRoleExecutives$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredRoleExecutives$ = this.roleexectives$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }


  goBack() {
    this.router.navigate(['/viewroleofexicutive']);
  }

}
