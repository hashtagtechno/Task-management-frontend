import { Routes } from '@angular/router';

import { AddTeamComponent } from '../../components/add-team/add-team.component';
import { TeamsComponent } from './teams.component';
import { TeamDetailsComponent } from '../../components/team-details/team-details.component';

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
  path: 'teamdetails/:id',
  component: TeamDetailsComponent,
  
},
 
];

