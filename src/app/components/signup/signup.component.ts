import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;
  passwordVisible = { old: false, new: false, confirm: false }; // Toggle password visibility
  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder){
    this.signUpForm = this.fb.group({
      userName:['',Validators.required],
      oldPassword: ['', Validators.required],
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

  }
 
}
