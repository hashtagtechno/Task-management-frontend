import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userInfo!: any;
  productivityRoute!: any;
  sidebarItems: any[] = [
    { title: 'Task Home', icon: 'fa fa-home', route: '/taskhome' },
    {
      title: 'Projects',
      icon: 'fa fa-solid fa-list-check',
      route: '/projects',
    },
    { title: 'Kanban', icon: 'fa fa-solid fa-boxes-stacked', route: '/kanban' },
    { title: 'Profile', icon: 'fa fa-solid fa-user', route: '/profile' },
    { title: 'Users', icon: 'fa fa-solid fa-users', route: '/users' },
    { title: 'Teams', icon: 'fa fa-solid fa-users', route: '/teams' },
  ];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.userInfo);

    this.productivityRoute =
      this.userInfo?.role === 'Employee'
        ? `teamlist/reports/${this.userInfo.id}`
        : this.userInfo?.role === 'Team Lead'
        ? `/teamlist`
        : null;

    if (this.productivityRoute) {
      this.sidebarItems.push({
        title: 'Productivity',
        icon: 'fa fa-solid fa-chart-simple',
        route: this.productivityRoute,
      });
    }
  }
}
