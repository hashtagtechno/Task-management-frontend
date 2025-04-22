import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  addUser(userdata:any){
        return this.http.post(`${environment.apiUrl}/auth/register`,userdata);
  }
  getUsers(){
    return this.http.get(`${environment.apiUrl}/auth/users`);
  }
  signIn(userdata:any){
    return this.http.post(`${environment.apiUrl}/auth/login`,userdata);
  }
  getUserList(){
    return this.http.get(`${environment.apiUrl}/auth/users-list`);
}
  
}
