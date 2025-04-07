import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks() {
    console.log(environment.apiUrl)
    return this.http.get(`${environment.apiUrl}/tasks`);
  }
  addTask(taskdata:any){
    return this.http.post(`${environment.apiUrl}/tasks`,taskdata);
  }
  getTaskDetails(id:string){
    // console.log(`${environment.apiUrl}/tasks/:${id}`)?
    return this.http.get(`${environment.apiUrl}/tasks/${id}`);
  }
  deleteTask(id:string){
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
  }
}
