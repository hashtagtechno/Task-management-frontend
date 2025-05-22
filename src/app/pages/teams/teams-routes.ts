import { Routes } from '@angular/router';

import { AddTeamComponent } from '../../components/add-team/add-team.component';
import { TeamsComponent } from './teams.component';
import { TeamDetailsComponent } from '../../components/team-details/team-details.component';

export const TEAM_ROUTES: Routes = [
  {
    path: 'add-team',
    component: AddTeamComponent,
    data: { breadcrumb:'Add Team'}
    
  },
  {
    path: '',
    component: TeamsComponent,
    
  },
  {
  path: 'teamdetails/:id/:name',
  component: TeamDetailsComponent,
   data: { breadcrumb: { alias: 'teamName' } }
  
},
 
];

