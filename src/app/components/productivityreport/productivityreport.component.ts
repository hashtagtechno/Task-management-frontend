import { Component } from '@angular/core';
import { ScreenShotService } from '../../services/screen-shot.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productivityreport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productivityreport.component.html',
  styleUrl: './productivityreport.component.scss',
})
export class ProductivityreportComponent {
  reports!: any;
  userInfo: any;
  maxDuration = 0;
  constructor(private ScreenShotService: ScreenShotService) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
  }
   now = new Date().toISOString();
  ngOnInit() {
    
    this.ScreenShotService.getReport(this.userInfo.id).subscribe(
      (data: any) => {
        const idleActivity: ActivityEntry = {
    appName: 'Total Idle Time',
    title: '',
    duration: data.data.totalIdleTime.seconds,
    readableDuration: data.data.totalIdleTime.readable,
    createdAt: this.now,
    updatedAt: this.now
  };
  
  data.data.activity.push(idleActivity);
        this.reports = data.data.activity;
        this.maxDuration = Math.max(...this.reports.map((a: { duration: any; }) => a.duration));
        console.log('API response:', this.reports);
      }
    );
  }
  
}
interface ActivityEntry {
  appName: string;
  title: string;
  duration: number;
  readableDuration: string;
  createdAt: string;
  updatedAt: string;
}