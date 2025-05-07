import { NgxOrgChartComponent } from '@ahmedaoui/ngx-org-chart';
import { INode } from '@ahmedaoui/ngx-org-chart/lib/node';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AddTeamComponent } from '../add-team/add-team.component';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../pages/teams.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [NgxOrgChartComponent,HeaderComponent,SidebarComponent,AddTeamComponent,CommonModule],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss'
})
export class TeamDetailsComponent {
  editMode = false;
  teamId!:any;
  team!:any;
  constructor(private TeamsService:TeamsService,private route:ActivatedRoute){}
ngOnInit(){
  this.teamId = this.route.snapshot.paramMap.get('id');
  console.log('Editing team with ID:', this.teamId);
  this.TeamsService.getTeamDetails(this.teamId).subscribe(
    (response) => {
      // console.log(response)
      this.team=response
      console.log(this.team);
})
}
  nodes: INode[] = [
    {
      name: 'Sundar Pichai',
      cssClass: 'ngx-org-ceo',
      image: '',
      title: 'Chief Executive Officer',
      childs: [
        {
          name: 'Thomas Kurian',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'CEO, Google Cloud',
        },
        {
          name: 'Susan Wojcicki',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'CEO, YouTube',
          
        },
        {
          name: 'Jeff Dean',
          cssClass: 'ngx-org-head',
          image: 'assets/node.svg',
          title: 'Head of Artificial Intelligence',
          childs: [
            {
              name: 'David Feinberg',
              cssClass: 'ngx-org-ceo',
              image: 'assets/node.svg',
              title: 'CEO, Google Health',
              childs: []
            }
          ]
        }
      ]
    },
    {
      name: 'Sundar Pichai',
      cssClass: 'ngx-org-ceo',
      image: 'assets/node.svg',
      title: 'Chief Executive Officer',
      childs: [
        {
          name: 'Thomas Kurian',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'CEO, Google Cloud',
        },
        {
          name: 'Susan Wojcicki',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'CEO, YouTube',
          childs: [
            {
              name: 'Beau Avril',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Global Head of Business Operations',
              childs: []
            },
            {
              name: 'Tara Walpert Levy',
              cssClass: 'ngx-org-vp',
              image: 'assets/node.svg',
              title: 'VP, Agency and Brand Solutions',
              childs: []
            },
            {
              name: 'Ariel Bardin',
              cssClass: 'ngx-org-vp',
              image: 'assets/node.svg',
              title: 'VP, Product Management',
              childs: []
            }
          ]
        },
        {
          name: 'Jeff Dean',
          cssClass: 'ngx-org-head',
          image: 'assets/node.svg',
          title: 'Head of Artificial Intelligence',
          childs: [
            {
              name: 'David Feinberg',
              cssClass: 'ngx-org-ceo',
              image: 'assets/node.svg',
              title: 'CEO, Google Health',
              childs: []
            }
          ]
        }
      ]
    },
    {
      name: 'Sundar Pichai',
      cssClass: 'ngx-org-ceo',
      image: 'assets/node.svg',
      title: 'Chief Executive Officer',
      childs: [
        {
          name: 'Thomas Kurian',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'CEO, Google Cloud',
        },
        {
          name: 'Susan Wojcicki',
          cssClass: 'ngx-org-ceo',
          image: 'assets/node.svg',
          title: 'CEO, YouTube',
          childs: [
            {
              name: 'Beau Avril',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Global Head of Business Operations',
              childs: []
            },
            {
              name: 'Tara Walpert Levy',
              cssClass: 'ngx-org-vp',
              image: 'assets/node.svg',
              title: 'VP, Agency and Brand Solutions',
              childs: []
            },
            {
              name: 'Ariel Bardin',
              cssClass: 'ngx-org-vp',
              image: 'assets/node.svg',
              title: 'VP, Product Management',
              childs: []
            }
          ]
        },
        {
          name: 'Jeff Dean',
          cssClass: 'ngx-org-head',
          image: 'assets/node.svg',
          title: 'Head of Artificial Intelligence',
          childs: [
            {
              name: 'David Feinberg',
              cssClass: 'ngx-org-ceo',
              image: 'assets/node.svg',
              title: 'CEO, Google Health',
              childs: []
            }
          ]
        }
      ]
    }
  ];
  test(event:any){
    console.log(event)
  }
  teams = {
    teamName: "Web Development",
    teamLead: "Mr Abbas",
    teamLeadId: "szbcsdbhadsvhgdsvhgdsa",
    teamMember: [
      { userId: "1", role: "Project Manager", name: "Sneha" },
      { userId: "2", role: "Developer", name: "Tanuja" }
    ]
  };
  
  enableEdit() {
    this.editMode = true;
  }
  
  cancelEdit() {
    this.editMode = false;
  }
  
  handleSave(updatedTeam: any) {
    this.team = updatedTeam;
    this.editMode = false;
  }
}


