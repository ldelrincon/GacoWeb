import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.Interceptor';
import { EncryptDecryptAuthInterceptor } from './core/interceptors/encryp.interceptor';
import { DecryptInterceptor } from './core/interceptors/DecryptInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        JwtInterceptor,
        EncryptDecryptAuthInterceptor,
        DecryptInterceptor
      ]),
      withFetch()
    )
  ]
};
