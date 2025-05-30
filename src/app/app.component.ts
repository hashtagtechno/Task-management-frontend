import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loadingservice';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {  ScreenShotService} from './services/screen-shot.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppLoadingComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class AppComponent { loading$: Observable<boolean>;
 title = 'task-management';
 userInfo!:any;
 screenshots: string[] = [];
  constructor(private loadingService: LoadingService,private http:HttpClient,private ScreenShotService: ScreenShotService,private cdRef: ChangeDetectorRef) {
    this.loading$ = this.loadingService.loading$;
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.userInfo)
  }
  ngOnInit(){
//     window.addEventListener('message', (event) => {
//       console.log('[Angular] Screenshot received');
//     if (event.data?.type === 'screenshot') {
//       this.screenshot = event.data.data;
//         this.screenshots.unshift(event.data.data); // Adds to top of array
//       console.log('[Angular] Screenshot received');
//       if (this.screenshot){
//  this.sendScreenshotToBackend(this.screenshot);
//       }
     
//     }
//   });
  }

 ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
 

//   async captureScreenshot() {
//     this.screenshot = await this.ScreenShotService.capture();
//      if (this.screenshot) {
//     console.log('[Angular] Screenshot received:', this.screenshot);
//   } else {
//     console.error('[Angular] Screenshot failed!');
//   }
  
// }
}

declare global {
  interface Window {
    electronAPI: {
      captureScreen: () => Promise<string>;
    };
  }
}