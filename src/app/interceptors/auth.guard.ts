// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';
//import { AuthService } from './auth.service'; // Your authentication service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router,private session :SessionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   // if (this.authService.isAuthenticated()) {
    console.log('in auth guard');
   const userid = this.session.getValue('userid')?.valueOf()
    console.log('> '+next.url);
   if(true){  
   return true; // User is authenticated, allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
  }
}
