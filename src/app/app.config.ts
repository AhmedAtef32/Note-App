import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withViewTransitions()),
     provideClientHydration(withEventReplay()),
     provideAnimationsAsync(),
     providePrimeNG({
      theme: {
          preset: Aura,
          options: {
            darkModeSelector: '.my-app-dark'
        }
      }
  }),
  provideHttpClient(withFetch()),
  provideAnimations(),
    provideToastr(), 
    ]
};
