import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { addTokeInterceptor } from './utils/add-toke.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(HttpClientModule),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideAnimations(),
    {provide: HTTP_INTERCEPTORS,  useClass: addTokeInterceptor, multi:true}
  ]
  
};
