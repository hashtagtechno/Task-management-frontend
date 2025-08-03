// breadcrumb-resolver.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BreadcrumbResolverService implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot): string {
    const userName = route.paramMap.get('userName');
    console.log(userName)
    return userName ?? 'User Report';
  }
}
