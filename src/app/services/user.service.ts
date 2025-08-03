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
//  getUserTagsTaskModel(): Observable<any> {
//     // console.log(this.useTagsBoolean);
//     if (this.userTags) {
//       if (this.useTagsBoolean == true) {
//         console.log(this.useTagsBoolean);
//         this.userTags = this.http
//           .get(`${apiPath.getUserTags_TaskModel}`)
//           .pipe(shareReplay());
//         this.updateuserTagsFalse();
//         return this.userTags;
//       } else {
//         return this.userTags;
//       }
//     } else {
//       this.userTags = this.http
//         .get(`${apiPath.getUserTags_TaskModel}`)
//         .pipe(shareReplay());
//       return this.userTags;
//     }
//   }
updateHeader() {
  this.headerUpdateSource.next();
}

  
}
