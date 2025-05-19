// loading.interceptor.ts
// loading.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loadingservice';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
