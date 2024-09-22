import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { AUTHENTICATION_STRATEGY } from './interfaces/authentication.interface';
import { AuthenticationService } from './core/services/authentication-service/authentication.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: AUTHENTICATION_STRATEGY,
      useClass: AuthenticationService
    }
  ]
};
