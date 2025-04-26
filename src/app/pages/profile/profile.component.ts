import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ImageCropComponent } from '../../components/image-crop/image-crop.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent,CommonModule,TagInputModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userInfo!:any;
  imageChangedEvent: any = '';
  fileTypesAllowed: any[] = ['.jpg', '.png', '.jpeg'];
  imageType: string = 'myProfile';
  constructor(  protected _notificationSvc: NotificationService,private modalService: NgbModal,){

  }
  ngOnInit(): void {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
  }
  onChangeFile(event: any) {
    this.imageChangedEvent = event.target.files[0];
    var extension = event.target.files[0]?.name.substr(
      event.target.files[0]?.name.lastIndexOf('.')
    );
    var extnsn = extension.toLowerCase();
    if (this.fileTypesAllowed.includes(extnsn)) {
      const initialState = {
        imageChangedEvent: this.imageChangedEvent,
        imageType: this.imageType,
      };
      const modalRef = this.modalService.open(ImageCropComponent)
        modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Profile updated successfully') {
            
            this.ngOnInit();
          }
        })
      // this.imageFileName = event.target.files[0].name;
      // this.image = event.target.files[0];
    } else {
      this._notificationSvc.error(
        'Error',
        'Can not upload file of this format'
      );
    }
  }
}
