import { Routes } from '@angular/router';

import { AddTeamComponent } from '../../components/add-team/add-team.component';
import { TeamsComponent } from './teams.component';
import { TeamDetailsComponent } from '../../components/team-details/team-details.component';
import { BreadcrumbResolver } from '../../Dynamic Route resolver/breadcrumb-routeresolver.';

export const TEAM_ROUTES: Routes = [
  {
    path: 'add-team',
    component: AddTeamComponent,
    
  },
  {
    path: '',
    component: TeamsComponent,
    
  },
  {
  path: 'teamdetails/:id/:name',
  component: TeamDetailsComponent,
  resolve: {
      apiData:BreadcrumbResolver,
    },
     data: {
    breadcrumb: { alias: '@teamname' } // 👈 required for dynamic breadcrumb update
  }
},
 
];

