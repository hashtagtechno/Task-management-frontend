import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {

   constructor(private http: HttpClient) { }
  addTeam(formdata:any){
    return this.http.post(`${environment.apiUrl}/teams/add`,formdata);
  }
  getTeamLeadList(){
    return this.http.get(`${environment.apiUrl}/teams/team-leads-list`);
  }
  getTeamUserList(){
    return this.http.get(`${environment.apiUrl}/teams/team-user-list`);
  }getTeamList(){
    return this.http.get(`${environment.apiUrl}/teams/get-all`);
  }
  editTeam(data:any,id:string){
    return this.http.put(`${environment.apiUrl}/teams/update${id}`,data);
  }
  getTeamDetails(id:any){
    return this.http.get(`${environment.apiUrl}/teams/get/${id}`);
  }
  getTeamMembers(id:any){
    return this.http.get(`${environment.apiUrl}/teams/get/${id}`);
  }
}
