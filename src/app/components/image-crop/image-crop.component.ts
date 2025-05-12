import { Component, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { UserService } from '../../services/user.service';
import { NotificationService } from './../../services/notification.service';
@Component({
  selector: 'app-image-crop',
  standalone: true,
  imports: [ImageCropperModule],
  templateUrl: './image-crop.component.html',
  styleUrl: './image-crop.component.scss',
})
export class ImageCropComponent {
  imageChangedEvent: any = '';
  public event: EventEmitter<any> = new EventEmitter();
  croppedImage: any = '';
  imageFileName!: string;
  fileToReturn: any;
  imageType!: string;
  userInfo!: any;
  constructor(
    public activeModal: NgbActiveModal,
    private UserService: UserService,
    protected _notificationSvc: NotificationService
  ) {}
  ngOnInit() {
    console.log(this.imageChangedEvent);
    const storedUser = localStorage.getItem('userInfo');

    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
  }
  closeModal() {
    this.activeModal.close();
  }

  imageLoaded(event: any) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.fileToReturn = this.base64ToFile(
    //   event.base64,
    //   this.imageChangedEvent.target.files[0].name,
    // )
    let file = this.dataURLtoBlob(this.croppedImage);
    this.fileToReturn = this.blobToFile(file, this.imageChangedEvent.name);
    //console.log(this.blobToFile(file, this.imageChangedEvent.name));
  }
  triggerEvent(msg: string) {
    this.event.emit(msg);
  }

  uploadImage() {
    //  console.log('hello')
    let UserImageUpload = new FormData();
    UserImageUpload.append(
      'profileImage',
      this.fileToReturn,
      this.imageChangedEvent.name
    );
    UserImageUpload.append('id', this.userInfo.id);
    for (const [key, value] of (UserImageUpload as any).entries()) {
      // console.log(`${key}:`, value);
    }
    this.UserService.uploadProfile(UserImageUpload).subscribe(
      (data: any) => {
        this.activeModal.close();
        this.ngOnInit();
        this.triggerEvent('Image uploaded');
        // this.UserService.updateProfile({'profileImage':data.filename}).subscribe(
        //   (data:any)=>{
        //     console.log(data)
        //
        //     // this.portfolioService.updateheaderTrue();
        //     this.activeModal.close();
        //     this.ngOnInit();
        //   }
        // )
      },
      (error) => {
        this._notificationSvc.error('Error', 'Upload Failed');
        this.triggerEvent('Uploaded failed');
      }
    );
  }
  dataURLtoBlob(dataURL: any) {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png',
    });
  }
  public blobToFile = (blob: Blob, fileName: string): File => {
    let b: any = blob;
    b.lastModifiedData = new Date();
    b.name = fileName;
    return blob as File;
  };
}
