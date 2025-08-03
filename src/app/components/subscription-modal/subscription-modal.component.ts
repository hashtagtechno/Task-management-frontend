import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputComponent, NgxIntlTelInputModule, CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-subscription-modal',
  standalone: true,
  imports: [NgxIntlTelInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './subscription-modal.component.html',
  styleUrl: './subscription-modal.component.scss'
})
export class SubscriptionModalComponent {
   subscriptionForm:UntypedFormGroup;
    CountryISO = CountryISO; // expose to template
     SearchCountryField = SearchCountryField;
     preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates];
  constructor( public activeModal: NgbActiveModal, private fb: FormBuilder,){
     this.subscriptionForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          organization: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          country:['',Validators.required],
          phone:[''],
          validity:[''],
          subscriptionType:['Free'],
          agreement: [false, Validators.requiredTrue] // must be checked
        });
  }
 closeModal(): void {
    this.activeModal.close();
  }
 
 onSubmit(){
console.log(this.subscriptionForm.value)
      console.log('Form Submitted:', this.subscriptionForm.value);
       const rawFormValue = this.subscriptionForm.value;

    // Replace the `phone` object with just the international number
    const payload = {
      ...rawFormValue,
      phone: rawFormValue.phone?.internationalNumber || ''
    };

      console.log('Payload to send:', payload);
}
}
