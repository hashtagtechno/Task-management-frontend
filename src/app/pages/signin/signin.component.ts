import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../../components/signup/signup.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
 msg!:string;
  alererror: boolean = false;
  signinForm;
  constructor(private UserService:UserService, private fb: FormBuilder, private router: Router,private modalService: NgbModal,) {
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
  openSignUpModal(){
       const modalRef = this.modalService.open(SignupComponent); 
         
  }
}
