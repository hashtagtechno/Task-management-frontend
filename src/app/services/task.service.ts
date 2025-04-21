import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks() {
    // console.log(environment.apiUrl)
    return this.http.get(`${environment.apiUrl}/task/tasks`);
  }
  addTask(taskdata:any){
    return this.http.post(`${environment.apiUrl}/task/tasks`,taskdata);
  }
  getTaskDetails(id:string){
    // console.log(`${environment.apiUrl}/tasks/:${id}`)?
    return this.http.get(`${environment.apiUrl}task/tasks/${id}`);
  }
  deleteTask(id:string){
    return this.http.delete(`${environment.apiUrl}/task/tasks/${id}`);
  }
  updateTask(id:string,status:string){
    return this.http.put(`${environment.apiUrl}/task/tasks/${id}`,{'status':status});
  }
}
