import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimations } from '@angular/platform-browser/animations';
const echartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts')
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxEchartsModule.forRoot(echartsConfig)),NgbModalModule,provideAnimations(), // ✅ Corrected
  ]
};


