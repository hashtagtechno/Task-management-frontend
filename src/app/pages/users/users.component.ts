import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  constructor(private modalService: NgbModal,private UserService:UserService){}
  users!:any;
  openviewuser(id:string){

  }
  deleteuser(id:string){

  }
  getLast4Chars(id:string): string {
    return  'USR-' + id.slice(-4);  // Get the last 4 characters
  } 
  openAddUserModal(){
        const modalRef = this.modalService.open(AddUserComponent);
        modalRef.componentInstance.event.subscribe((data: any) => {
              if (data=='User added successfully') {
                
                this.ngOnInit();
              }
            })
    }
    ngOnInit(){
      this.UserService.getUsers().subscribe((res: any) => {
        this.users = res.users; 
        // console.log(this.users); 
      });
    }
}
