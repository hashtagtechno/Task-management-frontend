import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
userInfo!:any;
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.userInfo)
   }
    addProject(projectdata:any){
      return this.http.post(`${environment.apiUrl}/projects/projects`,projectdata);
    }
    getProjects(){
      return this.http.get(`${environment.apiUrl}/projects/projects-task-list/${this.userInfo.id.toString() }`
      );
    }
    getProjectList(){
      return this.http.get(`${environment.apiUrl}/projects/project-name`);
    }
    getProjectTaskCount(){
      return this.http.get(`${environment.apiUrl}/projects/project-task-count`);
    }
}
