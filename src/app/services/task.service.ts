import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  userInfo!:any;
authToken!:any;
  constructor(private http: HttpClient,private zone: NgZone) {
   
  
   }
  

  getTasks() {
    const storedUser = localStorage.getItem('userInfo');
    this.authToken=localStorage.getItem('authToken')
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    const headers = new HttpHeaders({
            'Authorization': `Bearer ${ this.authToken}`
          });
    // console.log(environment.apiUrl)
    return this.http.get(`${environment.apiUrl}/tasks/get-all`,{headers});
  }
  getTasksCount() {
    return this.http.get(`${environment.apiUrl}/tasks/tasks-count`);
  }
  getWeeklyTime(frequency:string){
    return this.http.get(`${environment.apiUrl}/timers/productivity?user_id=${this.userInfo.id}&range=${frequency}`);
  }
  addTask(taskdata:any){
    return this.http.post(`${environment.apiUrl}/tasks/add`,taskdata);
  }
  getTaskDetails(id:string){
    // console.log(`${environment.apiUrl}/tasks/:${id}`)?
    return this.http.get(`${environment.apiUrl}/tasks/get/${id}`);
  }
  deleteTask(id:string){
    return this.http.delete(`${environment.apiUrl}/tasks/delete/${id}`);
  }
 
  startTask(id: string,user_id:string) {
    return this.http.post(`${environment.apiUrl}/timers/start`, {
      task_id:id,
      user_id:user_id
    });
  }
  
  completeTask(id: string) {
    console.log(id)
    return this.http.post(`${environment.apiUrl}/timers/stop`, {
      task_timer_id:id
  })
}
  
  resumeTask(id: string) {
    return this.http.post(`${environment.apiUrl}/timers/resume`, {
      task_timer_id:id
  })
}
  pauseTask(id: string) {
    console.log(id)
    return this.http.post(`${environment.apiUrl}/timers/pause`, {
      task_timer_id:id
  })
  
}
getServerSentEvent(id:string): Observable<string> {
  return new Observable((observer) => {
    const eventSource = new EventSource(`${environment.apiUrl}/timers/stream/?task_timer_id=${id}`);

    eventSource.onmessage = (event) => {
      // Run in Angular zone to ensure change detection
      this.zone.run(() => {
        observer.next(event.data);
      });
    };

    eventSource.onerror = (error) => {
      this.zone.run(() => {
        observer.error(error);
      });
      eventSource.close();
    };

    return () => eventSource.close(); // Cleanup on unsubscribe
  });
}
}
