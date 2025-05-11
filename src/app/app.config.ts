import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
function registerMaterialIcons(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  matIconRegistry.addSvgIcon(
    'cloud',
    domSanitizer.bypassSecurityTrustResourceUrl('assets/images/cloud.svg')
  );
  matIconRegistry.addSvgIcon(
    'bolt',
    domSanitizer.bypassSecurityTrustResourceUrl('assets/images/bolt.svg')
  );
  matIconRegistry.addSvgIcon(
    'trending-up',
    domSanitizer.bypassSecurityTrustResourceUrl('assets/images/trending-up.svg')
  );
  matIconRegistry.addSvgIcon(
    'trending-down',
    domSanitizer.bypassSecurityTrustResourceUrl('assets/images/trending-down.svg')
  );
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: 'icon-registration',
      useFactory: (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => () => registerMaterialIcons(matIconRegistry, domSanitizer),
      deps: [MatIconRegistry, DomSanitizer],
      multi: true
    }
  ],

};
