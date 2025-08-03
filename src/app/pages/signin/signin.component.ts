import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../../components/signup/signup.component';
import { UserService } from '../../services/user.service';
import { LoginComponent } from '../../components/login/login.component';
import { NgxIntlTelInputComponent, NgxIntlTelInputModule, CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { SubscriptionModalComponent } from '../../components/subscription-modal/subscription-modal.component';
import { isElectron } from '../../utils/electron.util';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  msg!: string;
   isElectronApp: boolean = false;
  contactBgColors: string[] = ['#d3f8e2', 'rgb(99 178 67)']; 
currentYear: number = new Date().getFullYear();
  alererror: boolean = false;
  signinForm;
  contactForm!: FormGroup;
    CountryISO = CountryISO; // expose to template
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates];
  pricingPlans = [
    {
      name: 'Free',
      price: '$0/mo',
      features: [
        'For Small organizations',
        'Basic Task management',
        '14 days free',
        'Up to 5 users',
      ],
      buttonLabel:'Free Trial' ,
    },
    {
      name: 'Standard',
      price: '$X.XX/mo',
      features: [
        'For Medium organization',
        'Task Management cum Productivity tool',
        'Up to 100 users',
        '1 year subscription',
        'zz$/user',
      ],
      buttonLabel: 'Upgrade',
    },
    {
      name: 'Premium',
      price: '$YY.YY/mo',
      features: [
        'For large organizations',
        'Everything in free',
        '1 year',
        'Unlimited Users',
        'Priority support',
      ],
      buttonLabel: 'Get Started',
    },
  ];

  features = [
     {
      title: 'Efficient task management',
      image: 'assets/images/screenshot1.png',
     bgColors: ['rgb(130 180 145)', , '#d2efdb'],
    },
    {
      title: 'Unlock your team potential',
      image: 'assets/images/screnshot5.png',
      bgColors: ['rgb(130 180 145)', , '#d2efdb'],
    },
    {
      title: 'Efficient task management',
      image: 'assets/images/screenshot1.png',
     bgColors: ['rgb(130 180 145)', , '#d2efdb'],
    },
    {
      title: 'Seamless Project management',
      image: 'assets/images/screenshot2.png',
     bgColors: ['rgb(130 180 145)', , '#d2efdb'],
    },
    {
      title: 'Manage hybrid teams',
      bgColors: ['rgb(130 180 145)', , '#d2efdb'],
      image: 'assets/images/screenshot3.png',
    },
    {
      title: 'Track productivity',
      image: 'assets/images/screenshot4.png',
     bgColors: ['rgb(130 180 145)', , '#d2efdb'],
    },
  ];
  selectedIndex = 0;
ngOnInit(){
   this.isElectronApp = isElectron();
}
  selectFeature(index: number) {
    this.selectedIndex = index;
  }
  constructor(
    private UserService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organization: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      country:['',Validators.required],
      phone:['']
    });
  }

  signin() {
    if (this.signinForm.valid) {
      let userData = {
        email: this.signinForm.value.email,
        password: this.signinForm.value.password,
      };

      this.UserService.signIn(userData).subscribe(
        (response: any) => {
          this.msg = 'Successfully logged In';
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userInfo', JSON.stringify(response.user));
          const token = localStorage.getItem('authToken');
          const userInfo = localStorage.getItem('userInfo');
          // console.log('Auth Token:', token);
          // console.log('User Info:', userInfo ? JSON.parse(userInfo) : null);
          this.router.navigate(['/taskhome']);
        },
        (error) => {
          this.msg = 'Invalid credentials';
          console.log(this.msg);
          this.alererror = true;
        }
      );
    }
  }
  openSignUpModal() {
    const modalRef = this.modalService.open(SignupComponent);
  }
  onSubmit(): void {
      console.log('Form Submitted:', this.contactForm.value);
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
       const rawFormValue = this.contactForm.value;

    // Replace the `phone` object with just the international number
    const payload = {
      ...rawFormValue,
      phone: rawFormValue.phone?.internationalNumber || ''
    };

      console.log('Payload to send:', payload);
      // TODO: Replace with API call
      this.contactForm.reset();
    }
  }
  openSignInModal(){
 const modalRef = this.modalService.open(LoginComponent,  {
      // windowClass: 'wide-modal'
  }
  
)
  modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Successfully logged In') {
             modalRef.close();
          }
        })
}
  openSubscriptionModal(){
 const modalRef = this.modalService.open(SubscriptionModalComponent)
  modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Project created successfully') {
           
          }
        })
}

}
