import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgxOrgChartComponent } from '@ahmedaoui/ngx-org-chart';
import { INode } from '@ahmedaoui/ngx-org-chart/lib/node';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,NgxOrgChartComponent,CommonModule,BreadcrumbModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  breadcrumbs: Array<any> = [];
  constructor(private router:Router,   private cdr: ChangeDetectorRef,private TeamsService:TeamsService,private breadCrumbService: BreadcrumbService,){

  }
  teamList!:any;
  ngOnInit(){
    this.breadCrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
      // console.log(this.breadcrumbs);
      // this.updateBreadCrumb();
      this.cdr.detectChanges();
    });
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
 
  redirectTeamDetails(id:string,name:string)
  {
    this.router.navigate(['teams/teamdetails',id,name]);
  }
  redirectAddteam(){
    this.router.navigate(['teams/add-team']);
  }
}