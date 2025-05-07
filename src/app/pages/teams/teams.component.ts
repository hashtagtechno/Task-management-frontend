import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgxOrgChartComponent } from '@ahmedaoui/ngx-org-chart';
import { INode } from '@ahmedaoui/ngx-org-chart/lib/node';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,NgxOrgChartComponent,CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  constructor(private router:Router,private TeamsService:TeamsService){

  }
  teamList!:any;
  ngOnInit(){
    this.TeamsService.getTeamList().subscribe(
      (response:any) => {
        // console.log(response)
        this.teamList =response.map((team: any) => ({
          id: team._id,  
    teamName:team.teamName,
        })
      )
      // console.log(this.teamList)
      })
  }
 
  redirectTeamDetails(id:string)
  {
    this.router.navigate(['teams/teamdetails',id]);
  }
  redirectAddteam(){
    this.router.navigate(['teams/add-team']);
  }
}