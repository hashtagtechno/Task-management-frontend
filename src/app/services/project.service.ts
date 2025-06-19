import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
userInfo!:any;
authToken!:any;
  constructor(private http: HttpClient) {
    // const storedUser = localStorage.getItem('userInfo');
    // this.authToken=localStorage.getItem('authToken')
    // this.userInfo = storedUser ? JSON.parse(storedUser) : null;
  
   }
    addProject(projectdata:any){
      return this.http.post(`${environment.apiUrl}/projects/add`,projectdata);
    }
    getProjects(userInfo:any){
      console.log(this.userInfo)
      return this.http.get(`${environment.apiUrl}/projects/projects-task-list/${userInfo.id.toString() }`
      );
    }
    getProjectList(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${ this.authToken}`
      });
      return this.http.get(`${environment.apiUrl}/projects/project-name`, { headers });
    }
    getProjectTaskCount(){
      return this.http.get(`${environment.apiUrl}/projects/project-task-count`);
    }
}
