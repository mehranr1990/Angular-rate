import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { ApiService, HttpClientCreator } from './core/services/api.service';
import { jwtInterceptor } from './core/helpers/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    // provideHttpClient(withInterceptorsFromDi()),
    { provide: ApiService, useFactory: HttpClientCreator, deps: [HttpClient] },
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi:true },
    // { provide: APP_INITIALIZER, useFactory: , multi:true },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
  ],
};
