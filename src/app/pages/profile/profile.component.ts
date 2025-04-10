import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userData = [
    { key: 'Name', value: 'Remo', icon: 'fa fa-user-circle' },
    { key: 'User Name', value: 'admin@taskmanager.com', icon: 'fa fa-user-circle' },
    { key: 'Email', value: 'admin@taskmanager.com', icon: 'fa fa-solid fa-envelope' },
    { key: 'Role', value: 'Admin', icon: 'fa fa-microchip' },
   
  ]
}
