import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { ScreenShotService } from '../../services/screen-shot.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-screens-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screens-view.component.html',
  styleUrl: './screens-view.component.scss'
})

export class ScreensViewComponent {
  userInfo!:any;
constructor(private ScreenShotService:ScreenShotService){
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    // console.log(this.userInfo)
}
  rawScreenshots: Screenshot[] = []; // Load from backend
  groupedScreenshots: { hour: string; screenshots: Screenshot[] }[] = [];

  ngOnInit() {
    // Fetch or populate this.rawScreenshots

    const groups = new Map<string, Screenshot[]>();
this.ScreenShotService.getScreenshots(this.userInfo.id).subscribe((data:any)=>{
  this.rawScreenshots=data;
  console.log(this.rawScreenshots)
  //  this.rawScreenshots.forEach((screenshot) => {
  //     const hourKey = dayjs(screenshot.timestamp).format('MMM D [at] hA');
  //     if (!groups.has(hourKey)) {
  //       groups.set(hourKey, []);
  //     }
  //     groups.get(hourKey)!.push(screenshot);
  //   });

  //   this.groupedScreenshots = Array.from(groups.entries()).map(([hour, screenshots]) => ({
  //     hour,
  //     screenshots,
  //   }));
this.rawScreenshots = this.rawScreenshots.map(img => ({
  imageUrl: img,
  timestamp: this.getRandomTimestampWithinLastDay()
}));


})
 }
  getRandomTimestampWithinLastDay(): string {
  const now = Date.now();
  // Random offset between 0 and 24 hours (in ms)
  const randomOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
  const randomTimestamp = new Date(now - randomOffset);
  return randomTimestamp.toISOString();
}
}
interface Screenshot {
  imageUrl: any;
  timestamp: string;
}
