// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private activeRequests = 0;

  show() {
    this.activeRequests++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.activeRequests = Math.max(this.activeRequests - 1, 0);
    if (this.activeRequests === 0) {
      this.loadingSubject.next(false);
    }
  }
}
