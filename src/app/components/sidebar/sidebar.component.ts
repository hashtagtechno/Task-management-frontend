import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router:Router){

  }
  sidebarItems = [
    { title: 'Task Home', icon:"fa fa-home", route: '/taskhome' },
    { title: 'Projects', icon:"fa-solid fa-list-check", route: '../projects' },
    { title: 'Kanban', icon:"fa-solid fa-boxes-stacked", route: '/kanban'},
    { title: 'Profile', icon:"fa-solid fa-boxes-stacked", route: '/profile'},
    { title: 'LogOut', icon:"fa-solid fa-right-from-bracket", route: '/'},
  ]
}
