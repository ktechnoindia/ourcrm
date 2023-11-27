// http-interceptor.module.ts

import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorProvider } from './interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider, // Your interceptor class
      multi: true,
    },
  ],
})
export class HttpInterceptorModule {}
