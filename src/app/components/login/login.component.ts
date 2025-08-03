import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 public event: EventEmitter<any> = new EventEmitter();
msg!:string;
  alererror: boolean = false;
  signinForm;
  constructor(private UserService:UserService,public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,private modalService: NgbModal,) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signin() {
   
    if (this.signinForm.valid) {
     let userData={
        email:this.signinForm.value.email,
        password: this.signinForm.value.password,
      }
     
      this.UserService.signIn(userData).subscribe(
        (response:any) => {
            this.msg ='Successfully logged In';
            this.triggerEvent(this.msg)
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userInfo', JSON.stringify(response.user));
            const token = localStorage.getItem('authToken');
            const userInfo = localStorage.getItem('userInfo');
            // console.log('Auth Token:', token);
            // console.log('User Info:', userInfo ? JSON.parse(userInfo) : null);
              this.router.navigate(['/taskhome']);
      
    },
    (error)=>{
      this.msg ='Invalid credentials';
      console.log(this.msg)
      this.alererror=true;
    }
  )
}
  }
  triggerEvent(msg: string) {
  this.event.emit(msg);
}
  openSignUpModal(){
       const modalRef = this.modalService.open(SignupComponent); 
         
  }
   closeModal() {
  this.activeModal.close();
}
}
