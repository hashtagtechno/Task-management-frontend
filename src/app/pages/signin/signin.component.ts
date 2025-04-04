import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  alererror: boolean = false;
  signinForm;
  constructor(private fb: FormBuilder, private router: Router) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signin() {
   
    if (this.signinForm.valid) {
      const username = this.signinForm.value.username;
      const password = this.signinForm.value.password;

      if (username === 'admin@taskmanager.com' && password === 'Admin@123') {
        this.alererror = false;
        this.router.navigate(['/taskhome']);
      } else {
        this.alererror = true;
      }
    }
  }
}
