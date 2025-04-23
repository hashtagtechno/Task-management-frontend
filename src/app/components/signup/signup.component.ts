import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;
  msg!:string;
  passwordVisible = { old: false, new: false, confirm: false }; // Toggle password visibility
  constructor(public activeModal: NgbActiveModal,protected _notificationSvc: NotificationService, private router: Router,private fb: FormBuilder,private UserService:UserService){
    this.signUpForm = this.fb.group({
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/) // At least 1 uppercase, 1 lowercase, 1 number
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }
  closeModal() {
    this.activeModal.close();
  }
  onSubmit(){
console.log(this.signUpForm.value)
let userData={
name:this.signUpForm.value.userName,
email:this.signUpForm.value.email,
password:this.signUpForm.value.newPassword,

}
console.log(userData)
this.UserService.addUser(userData).subscribe(
  (response) => {
      this.msg ='User added successfully';
      this._notificationSvc.success('', 'User added successfully. Please Sign In.');
        this.activeModal.close();
        
}
)
  }
 
}
