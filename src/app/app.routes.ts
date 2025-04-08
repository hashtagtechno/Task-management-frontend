import { Routes } from '@angular/router';

export const routes: Routes = [ { 
    path: '', 
    loadComponent: () => import('../app/pages/signin/signin.component').then(m => m.SigninComponent) 
  },
  { 
    path: 'taskhome', 
    loadComponent: () => import('../app/pages/task-home/task-home.component').then(m => m.TaskHomeComponent) 
  },
  { 
    path: 'kanban', 
    loadComponent: () => import('../app/pages/kanban-board/kanban-board.component').then(m => m.KanbanBoardComponent) 
  },
  { 
    path: 'projects', 
    loadComponent: () => import('../app/pages/project-borard/project-borard.component').then(m => m.ProjectBorardComponent) 
  },
];
