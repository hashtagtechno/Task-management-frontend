import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { ScreenShotService } from '../../services/screen-shot.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userInfo!:any;
  userImage!:any;
   screenshots: string[] = [];
    screenshot: string | null = null;
  constructor(private router:Router,private userService:UserService,private ScreenShotService:ScreenShotService){
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    // console.log(this.userInfo)
  }
  searchText:string="";
  showClose:boolean=false;
  ngOnInit(){
    this.userService.headerUpdate$.subscribe(data => {
      this.fetchProfile();
    });
    this.fetchProfile();
     window.addEventListener('message', (event) => {
      console.log('[Angular] Screenshot received');
    if (event.data?.type === 'screenshot') {
      this.screenshot = event.data.data;
        this.screenshots.unshift(event.data.data); // Adds to top of array
      console.log('[Angular] Screenshot received');
      if (this.screenshot){
 this.sendScreenshotToBackend(this.screenshot);
      }
     
    }
  });
  }
   sendScreenshotToBackend(base64: string) {
  const blob = this.base64ToBlob(base64);
  const formData = new FormData();

  formData.append('screenshot', blob, `screenshot_${Date.now()}.png`);
  formData.append('userId', this.userInfo.id); // Replace with dynamic ID if needed
// console.log(formData);
  this.ScreenShotService. addScreenShot(formData).subscribe({
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
  search(){

  }
  fetchProfile(){
    this.userService.getUserDetail(this.userInfo.id).subscribe((data:any) => {
      this.userImage = data.profileImage;
      // console.log(  this.userImage);
    }, error => {
  
    });
  }
  clearSearch(){

  }
  enterSearch(){

  }
  logOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    this.router.navigateByUrl('/');
    console.log(token,userInfo)
  }
  profile(){
    this.router.navigateByUrl('/profile');
  }
}
