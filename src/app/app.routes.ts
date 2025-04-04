import { Routes } from '@angular/router';

export const routes: Routes = [ { 
    path: '', 
    loadComponent: () => import('../app/pages/signin/signin.component').then(m => m.SigninComponent) 
  },
  { 
    path: 'taskhome', 
    loadComponent: () => import('../app/pages/task-home/task-home.component').then(m => m.TaskHomeComponent) 
  },
];
