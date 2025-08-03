import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ReportRedirectGuard implements CanActivate {
  userInfo!: any;
  constructor(private router: Router) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.userInfo);
  }

  canActivate(): boolean {
    if (this.userInfo.role === 'Employee') {
      this.router.navigate([`/reports/${this.userInfo.role}`]);
    } else if (this.userInfo.role === 'Team Lead') {
      this.router.navigate(['/teamlist']); // or wherever team managers go
    } else {
      this.router.navigate(['/']); // fallback or unauthorized
    }

    return false;
  }
}
