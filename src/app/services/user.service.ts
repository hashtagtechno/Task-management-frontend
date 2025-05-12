import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo!:any;
  authToken!:any;
  private headerUpdateSource = new Subject<void>();
  headerUpdate$ = this.headerUpdateSource.asObservable();


  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('userInfo');
    this.authToken=localStorage.getItem('authToken')
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
   }
  addUser(userdata:any){
        return this.http.post(`${environment.apiUrl}/auth/register`,userdata);
  }
  getUsers(){
    return this.http.get(`${environment.apiUrl}/auth/get-all`);
  }
  signIn(userdata:any){
    return this.http.post(`${environment.apiUrl}/auth/login`,userdata);
  }
  getUserList(id:string){
    return this.http.get(`${environment.apiUrl}/auth/users-list/${id}`);
}
getUserDetail(id:string){
  return this.http.get(`${environment.apiUrl}/auth/users-detail/${id}`);
}
uploadProfile(FormData:any){
  return this.http.post(`${environment.apiUrl}/auth/upload-profile`, FormData);
}
// updateProfile(data:any){
//   console.log(this.userInfo.id)
//   return this.http.put(`${environment.apiUrl}/auth/update/${this.userInfo.id}`,data );
// }
updateHeader() {
  this.headerUpdateSource.next();
}

  
}
