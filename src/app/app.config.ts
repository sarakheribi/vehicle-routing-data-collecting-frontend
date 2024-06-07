import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:9090',
        realm: 'routingapp',
        clientId: 'routing-frontend',
      },
      initOptions: {
        onLoad: 'login-required',
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: true
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER, useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: KeycloakBearerInterceptor, multi: true},
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync()

  ]
};
