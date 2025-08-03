import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule,BreadcrumbModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss',
})
export class TeamListComponent {
  constructor(private UserService: UserService, private router: Router) {}
  users!: any;
  currentDate: Date = new Date();

getFormattedDate(): string {
  const day = this.currentDate.getDate();
  const month = this.currentDate.toLocaleString('default', { month: 'long' });
  const year = this.currentDate.getFullYear();
  const suffix = this.getDaySuffix(day);
  return `${day}${suffix} ${month} ${year}`;
}

getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

  ngOnInit() {
    this.UserService.getUsers().subscribe((res: any) => {
      this.users = res.users;
      // console.log(this.users);
    });
  }
  getLast4Chars(id: string): string {
    return 'USR-' + id.slice(-4); // Get the last 4 characters
  }
  rediretToReports(id: string,name:string) {
    // console.log(id);
    this.router.navigate(['/teamlist/reports', id,name]);
  }
}
