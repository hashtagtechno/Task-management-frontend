import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
    addProject(projectdata:any){
      return this.http.post(`${environment.apiUrl}/projects/projects`,projectdata);
    }
    getProjects(){
      return this.http.get(`${environment.apiUrl}/projects/projects`);
    }
    getProjectList(){
      return this.http.get(`${environment.apiUrl}/projects/project-list`);
    }
    getProjectTaskCount(){
      return this.http.get(`${environment.apiUrl}/projects/project-task-count`);
    }
}
