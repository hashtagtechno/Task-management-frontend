import { Routes } from '@angular/router';
import { BreadcrumbResolverService } from '../../services/breadcrumbresolver.service';

export const REPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./team-list/team-list.component').then(
        (m) => m.TeamListComponent
      ),
    data: {
      breadcrumb: 'My Team',
    },
  },
  {
    path: 'reports/:userId/:userName',
    loadComponent: () =>
      import('./reports.component').then(
        (m) => m.ReportsComponent
      ),
 data: {
   breadcrumb: { alias: 'userReport' },
  },
  },
];
