// app-loading.component.ts
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loadingservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="loader-backdrop" *ngIf="loading$ | async">
      <div class="loader-message">{{ currentQuote }}</div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
  imports:[CommonModule]
})
export class AppLoadingComponent {
  loading$ = this.loadingService.loading$;
  quotes = [
    "Patience is also a form of action.",
    "Good things take time.",
    "Progress, not perfection.",
    "Small steps every day.",
    "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    "Focus on being productive instead of busy",
    "Your future is created by what you do today, not tomorrow",
    "Success is the sum of small efforts, repeated day in and day out"
    
  ];
  currentQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

  constructor(private loadingService: LoadingService) {}
}
