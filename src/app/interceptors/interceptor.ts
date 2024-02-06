
import { formatDate } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { Observable, throwError } from 'rxjs';
 
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {
constructor(private session:SessionService,private router:Router){}
   
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  debugger;
    let skipauth:boolean =false;
    if (request.url.includes('login')||request.url.includes('signup')||request.url.includes('getCountries')||request.url.includes('getDistricts')||request.url.includes('getStates')) {
      // Bypass interception for localhost
      skipauth=true;
     // return next.handle(request);
    }
    const token = this.session.getValue('token')?.valueOf();
 //   const tkeys =  this.session.get('tkey');
    // const tkeys =  this.session.getValue('tkey')?.valueOf();
    // const userid =  this.session.getValue('userid')?.valueOf();
   
    const keys = formatDate(new Date(), 'yMMddHH', 'en-IN');
  //  const useridString = userid as string;
// console.log(useridString.length+'  <<<<');
      if(skipauth || token){//&& tkeys==keys){

    //  //    this.router.navigate(['/dashboard']);
        }else{
        console.log('uel>>>>>>>>>>>>>> '+request.url); 

         this.router.navigate(['/login']);
        }
    //Authentication by setting header with token value
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer '+token,
          // 'key':keyz,
          //headers for security ** Gurpreet
          "Permissions-Policy": "camera=,geolocation=,microphone=,autoplay=,fullscreen=,picture-in-picture=,sync-xhr=,encrypted-media=,oversized-images=*",
    "Strict-Transport-Security": "max-age=36000; includeSubdomains",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "X-Xss-Protection": "1; mode=block",
    "Cache-Control":  "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache",
    "Expires": "0",
 //   "Content-Security-Policy": "script-src https: 'unsafe-inline' 'unsafe-eval';style-src https: 'unsafe-inline' 'unsafe-eval';img-src https: data:;font-src https: data:;"

          // Authorization: this.jwtService.getJwtToken()  nitish code do not remove


          "Content-Security-Policy": "script-src 'strict-dynamic' 'nonce-rAnd0m123' 'unsafe-inline' http: https:; object-src 'none'; base-uri 'none';require-trusted-types-for 'script';"
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
    }
}