import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbResolver implements Resolve<any> {
  constructor(private breadcrumbService: BreadcrumbService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const name = route.paramMap.get('name');
    console.log(name)
    const breadcrumb = `Team: ${name}`;

    return of(breadcrumb).pipe(
      tap(() => {
        this.breadcrumbService.set('@teamname', `Team: ${name}`); // '@teams' matches the alias in the route
      })
    );
  }
}
