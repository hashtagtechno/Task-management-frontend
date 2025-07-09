import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { ScreenShotService } from '../../services/screen-shot.service';
import { DownloadModalComponent } from '../download-modal/download-modal.component';
import { isElectron } from '../../utils/electron.util';
import { GithubRleaseService } from '../../services/github-rlease.service';
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
  isElectronApp: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private ScreenShotService: ScreenShotService,
    private modalService: NgbModal,
    private GithubRleaseService: GithubRleaseService
  ) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    // console.log(this.userInfo)
  }
  searchText: string = '';
  showClose: boolean = false;
  windowsDownloadUrl: any;
  ngOnInit() {
    this.isElectronApp = isElectron();

    //  this.GithubRleaseService.getLatestWindowsInstallerUrl().subscribe((data) => {
    //   const exeAsset = data.assets.find((asset: any) => asset.name.endsWith('.exe'));
    //   if (exeAsset) {
    //     this.windowsDownloadUrl = exeAsset.browser_download_url;
    //   }
    // });
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
  openDownloadModal() {
    const modalRef = this.modalService.open(DownloadModalComponent);
    modalRef.componentInstance.windowsUrl =
      'https://github.com/youruser/yourrepo/releases/latest/download/yourapp.exe';
    modalRef.componentInstance.macUrl =
      'https://github.com/youruser/yourrepo/releases/latest/download/yourapp.dmg';
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
