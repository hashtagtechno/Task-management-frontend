import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  userInfo!:any;
authToken!:any;
  constructor(private http: HttpClient) {
   
  
   }
  

  getTasks() {
    const storedUser = localStorage.getItem('userInfo');
    this.authToken=localStorage.getItem('authToken')
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    const headers = new HttpHeaders({
            'Authorization': `Bearer ${ this.authToken}`
          });
    // console.log(environment.apiUrl)
    return this.http.get(`${environment.apiUrl}/task/get-all`,{headers});
  }
  getTasksCount() {
    return this.http.get(`${environment.apiUrl}/task/tasks-count`);
  }
  addTask(taskdata:any){
    return this.http.post(`${environment.apiUrl}/task/tasks`,taskdata);
  }
  getTaskDetails(id:string){
    // console.log(`${environment.apiUrl}/tasks/:${id}`)?
    return this.http.get(`${environment.apiUrl}/task/tasks/${id}`);
  }
  deleteTask(id:string){
    return this.http.delete(`${environment.apiUrl}/task/tasks/${id}`);
  }
  updateTask(id:string,status:string){
    return this.http.put(`${environment.apiUrl}/task/tasks/${id}`,{'status':status});
  }
}
