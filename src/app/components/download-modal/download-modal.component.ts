import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GithubRleaseService } from '../../services/github-rlease.service';

@Component({
  selector: 'app-download-modal',
  standalone: true,
  imports: [],
  templateUrl: './download-modal.component.html',
  styleUrl: './download-modal.component.scss'
})
export class DownloadModalComponent {
 @Input() windowsUrl: string = '';
  @Input() macUrl: string = '';

  constructor(public activeModal: NgbActiveModal,private githubService:GithubRleaseService) {}
   closeModal() {
  this.activeModal.close();
}
downloadWindowsApp() {
  fetch('https://api.github.com/repos/hashtagtechno/Task-management-frontend/releases/latest')
    .then(response => response.json())
    .then(data => {
      // Find the .exe file in the release assets
      const exeAsset = data.assets.find((asset: any) =>
        asset.name.endsWith('.exe')
      );

      if (exeAsset) {
        // Create a hidden link and trigger download
        const a = document.createElement('a');
        a.href = exeAsset.browser_download_url;
        a.download = exeAsset.name;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        alert('No .exe file found in the latest release.');
      }
    })
    .catch(error => {
      console.error('Error fetching GitHub release:', error);
      alert('Something went wrong while downloading.');
    });
}

}