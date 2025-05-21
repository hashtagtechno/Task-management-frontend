import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/httpinterceptor';
const echartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts')
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() ,
   provideHttpClient(
      withInterceptors([loadingInterceptor]) // ✅ CORRECT
    ),
    importProvidersFrom(NgxEchartsModule.forRoot(echartsConfig)),NgbModalModule,provideAnimations(), // ✅ Corrected
  ]
};


function provideBreadcrumb(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

