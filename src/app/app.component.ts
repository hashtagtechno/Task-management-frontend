import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loadingservice';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ScreenShotService } from './services/screen-shot.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppLoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loading$: Observable<boolean>;
  title = 'task-management';
  userInfo!: any;
  screenshots: string[] = [];
  screenshot: string | null = null;
  listenersInitialized = false;
  constructor(
    private loadingService: LoadingService,
    private http: HttpClient,
    private ScreenShotService: ScreenShotService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.loading$ = this.loadingService.loading$;
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.userInfo);
  }
  ngOnInit() {
    console.log(this.userInfo);
    if (this.userInfo != null && !this.listenersInitialized) {
      this.listenersInitialized = true;
      if (window?.electronAPI) {
        window.electronAPI.onWindowOpened((data: any) => {
          console.log('[Angular] Window-opened:', data);
        });

        window.electronAPI.onWindowClosed((data: any) => {
          console.log(this.userInfo);
          console.log('[Angular] Window-closed from electron:', data);
          this.ngZone.run(() => {
            const userID = this.userInfo.id; // however you retrieve it
            const enrichedData = {
              ...data,
              userID,
            };
            console.log('Received with userId:', enrichedData);
            this.ScreenShotService.addWindowDetails(enrichedData).subscribe({
              next: () =>
                console.log('[Angular] Screenshot uploaded successfully'),
              error: (err) => console.error('[Angular] Upload failed', err),
            });
          });
        });
      }
      window.electronAPI.onIdleTime((idleTime) => {
        console.log('Idle Time:', idleTime);

        if (idleTime > 900) {
          this.ngZone.run(() => {
            const userID = this.userInfo.id; // howevy
            // er you retrieve it
            const idleData = {
              idleSeconds: idleTime,
              userID,
            };
            console.log('Received with userId:', idleData);
            this.ScreenShotService.addIdleDataDetails(idleData).subscribe({
              next: () => console.log('Idle time uploaded successfully'),
              error: (err) => console.error('[Angular] Upload failed', err),
            });
          });
        }
      });
      // Screenshot listener
      window.addEventListener('message', (event) => {
        console.log('hello');
        if (event.data?.type === 'screenshot') {
          console.log('[Angular] Screenshot received');
          this.screenshot = event.data.data;
          console.log(this.screenshot);
          this.screenshots.unshift(event.data.data);

          if (this.screenshot) {
            const blob = this.base64ToBlob(this.screenshot);
            const objectUrl = URL.createObjectURL(blob);

            const img = new Image();
            img.onload = () => {
              console.log('Image width:', img.width);
              console.log('Image height:', img.height);
              console.log('File size in KB:', Math.round(blob.size / 1024));
              URL.revokeObjectURL(objectUrl);
            };

            img.src = objectUrl;

            this.sendScreenshotToBackend(this.screenshot);
          }
        }
      });
    }
  }
  sendScreenshotToBackend(base64: string) {
    const blob = this.base64ToBlob(base64);
    const formData = new FormData();

    formData.append('screenshot', blob, `screenshot_${Date.now()}.png`);
    formData.append('userId', this.userInfo.id); // Replace with dynamic ID if needed
    // console.log(formData);
    this.ScreenShotService.addScreenShot(formData).subscribe({
      next: () => console.log('[Angular] Screenshot uploaded successfully'),
      error: (err) => console.error('[Angular] Upload failed', err),
    });
  }
  base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer.byteLength);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: 'image/png' });
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}

declare global {
  interface Window {
    electronAPI: {
      onWindowOpened: (
        callback: (data: {
          app: string;
          title: string;
          openedAt: string;
        }) => void
      ) => void;
      onWindowClosed: (
        callback: (data: {
          app: string;
          title: string;
          openedAt: string;
          closedAt: string;
        }) => void
      ) => void;
      onIdleTime: (callback: (idleTime: number) => void) => void;
    };
  }
}
