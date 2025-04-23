import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userInfo!:any;
  constructor(private router:Router){
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    // console.log(this.userInfo)
  }
  searchText:string="";
  showClose:boolean=false;
  search(){

  }
  clearSearch(){

  }
  enterSearch(){

  }
  logOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/');
  }
  profile(){
    this.router.navigateByUrl('/profile');
  }
}
