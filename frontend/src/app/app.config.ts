import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AUTHENTICATION_STRATEGY } from './interfaces/authentication.interface';
import { AuthenticationService } from './core/services/authentication-service/authentication.service';
import { authenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { DATA_REQUEST_STRATEGY } from './interfaces/user-data-request.interface';
import { UserDataRequestService } from './core/services/server-services/user-data-request.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    {
      provide: AUTHENTICATION_STRATEGY,
      useClass: AuthenticationService
    },
    {
      provide: DATA_REQUEST_STRATEGY,
      useClass: UserDataRequestService
    }
  ]
};
