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
  imports: [FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userInfo!: any;
  userImage!: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private ScreenShotService: ScreenShotService
  ) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    // console.log(this.userInfo)
  }
  searchText: string = '';
  showClose: boolean = false;
  ngOnInit() {
    this.userService.headerUpdate$.subscribe((data) => {
      this.fetchProfile();
    });
    this.fetchProfile();
  }

  search() {}
  fetchProfile() {
    this.userService.getUserDetail(this.userInfo.id).subscribe(
      (data: any) => {
        this.userImage = data.profileImage;
        // console.log(  this.userImage);
      },
      (error) => {}
    );
  }
  clearSearch() {}
  enterSearch() {}
  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    this.router.navigateByUrl('/');
    console.log(token, userInfo);
  }
  profile() {
    this.router.navigateByUrl('/profile');
  }
}
// declare global {
//   interface Window {
//     electronAPI: {
//       onWindowOpened: (
//         callback: (data: {
//           app: string;
//           title: string;
//           openedAt: string;
//         }) => void
//       ) => void;
//       onWindowClosed: (
//         callback: (data: {
//           app: string;
//           title: string;
//           openedAt: string;
//           closedAt: string;
//         }) => void
//       ) => void;
//     };
//   }
// }
