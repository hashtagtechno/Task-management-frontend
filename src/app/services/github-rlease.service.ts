import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubRleaseService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'https://github.com/hashtagtechno/Task-management-frontend/releases/latest';
   getLatestWindowsInstallerUrl() {
    return this.http.get<any>(this.apiUrl);
  }
}
