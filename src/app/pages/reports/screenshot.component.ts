import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ScreensViewComponent } from '../../components/screens-view/screens-view.component';
import { ScreenShotService } from '../../services/screen-shot.service';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
@Component({
  selector: 'app-screenshot',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    ScreensViewComponent,
    CommonModule,
  ],
  templateUrl: './screenshot.component.html',
  styleUrl: './screenshot.component.scss',
})
export class ScreenshotComponent {
  userInfo!: any;
  groupedScreenshots: { [hour: string]: Screenshot[] } = {};
  rawScreenshots: Screenshot[] = []; // Load from backend
  constructor(
    private ScreenShotService: ScreenShotService,
    private modalService: NgbModal
  ) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    // console.log(this.userInfo)
  }
  ngOnInit() {
    this.ScreenShotService.getScreenshots(this.userInfo.id).subscribe(
      (data: any) => {
        this.rawScreenshots = data.data;

        // First sort raw screenshots by uploadedAt DESC
        this.rawScreenshots.sort((a, b) => {
          return (
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          );
        });

        const groups: { [hour: string]: Screenshot[] } = {};

        this.rawScreenshots.forEach((screenshot) => {
          const hourKey = dayjs(screenshot.uploadedAt).format('MMM D h A');
          if (!groups[hourKey]) {
            groups[hourKey] = [];
          }
          groups[hourKey].push(screenshot);
        });

        this.groupedScreenshots = groups;
        // console.log(this.groupedScreenshots);
      }
    );
  }

  openImageModal(imagePath: string) {
    console.log(imagePath);
    const modalRef = this.modalService.open(ImageModalComponent, {
      windowClass: 'wide-modal',
    });
    modalRef.componentInstance.imagePath = imagePath;
  }
}

interface Screenshot {
  _id: string;
  filename: string;
  path: string;
  uploadedAt: string; // ISO timestamp string
}
