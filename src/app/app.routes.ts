import { Routes } from '@angular/router';
import { ReportRedirectGuard } from './guard/report-redirect.guard';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
  },
  //   {
  //     path: 'taskhome',
  //     loadComponent: () =>
  //       import('../app/pages/task-home/task-home.component').then(
  //         (m) => m.TaskHomeComponent
  //       ),
  //   },
  //   {
  //     path: 'kanban',
  //     loadComponent: () =>
  //       import('../app/pages/kanban-board/kanban-board.component').then(
  //         (m) => m.KanbanBoardComponent
  //       ),
  //   },
  //   {
  //     path: 'projects',
  //     loadComponent: () =>
  //       import('../app/pages/project-borard/project-borard.component').then(
  //         (m) => m.ProjectBorardComponent
  //       ),
  //   },
  //   {
  //     path: 'profile',
  //     loadComponent: () =>
  //       import('../app/pages/profile/profile.component').then(
  //         (m) => m.ProfileComponent
  //       ),
  //   },
  //   {
  //     path: 'users',
  //     loadComponent: () =>
  //       import('../app/pages/users/users.component').then(
  //         (m) => m.UsersComponent
  //       ),
  //   },

  //   {
  //   path: 'teamlist',
  //   loadComponent: () =>
  //     import('./pages/reports/team-list/team-list.component').then(
  //       (m) => m.TeamListComponent
  //     ),
  // },

  //   {
  //     path: 'reports/:userId',
  //     loadComponent: () =>
  //       import('./pages/reports/reports.component').then(
  //         (m) => m.ReportsComponent
  //       ),
  //   },
  //   {
  //     path: 'teams',
  //     loadChildren: () =>
  //       import('./pages/teams/teams-routes').then((m) => m.TEAM_ROUTES),
  //     data: {
  //       breadcrumb: 'Teams',
  //     },
  //   },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'taskhome',
        loadComponent: () =>
          import('./pages/task-home/task-home.component').then(
            (m) => m.TaskHomeComponent
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/project-borard/project-borard.component').then(
            (m) => m.ProjectBorardComponent
          ),
      },
      {
        path: 'kanban',
        loadComponent: () =>
          import('./pages/kanban-board/kanban-board.component').then(
            (m) => m.KanbanBoardComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../app/pages/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      // {
      //   path: 'teamlist',
      //   children: [
      //     {
      //       path: '',
      //       loadComponent: () =>
      //         import('./pages/reports/team-list/team-list.component').then(
      //           (m) => m.TeamListComponent
      //         ),
      //       data: {
      //         breadcrumb: 'My Team',
      //       },
      //     },
      //     {
      //       path: 'reports/:userId/:userName',
      //       loadComponent: () =>
      //         import('./pages/reports/reports.component').then(
      //           (m) => m.ReportsComponent
      //         ),
      //          data: { breadcrumb: { alias: 'userName' } }
      //     },
      //   ],
      // },
      {
        path: 'teams',
        loadChildren: () =>
          import('./pages/teams/teams-routes').then((m) => m.TEAM_ROUTES),
        data: {
          breadcrumb: 'Teams',
        },
      },
      {
  path: 'teamlist',
  loadChildren: () =>
    import('./pages/reports/reports-routes').then((m) => m.REPORT_ROUTES),
},
    ],
  },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./pages/signin/signin.component').then((m) => m.SigninComponent),
  // }
];
