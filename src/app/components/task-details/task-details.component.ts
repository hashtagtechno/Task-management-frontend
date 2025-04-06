import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  constructor(public activeModal: NgbActiveModal,){}
  closeModal() {
    this.activeModal.close();
  }
  task:Task = {
    id: 101,
    title: 'Implement Login Flow',
    status: 'Inprogress',
    assignee: 'Sneha Paul',
    start_date: new Date('2025-04-01'),
    due_date: new Date('2025-04-10'),
    progress: 45,
    description: `Design and implement login flow for users including:
  - Login page UI
  - API integration
  - Error handling
  - Redirect to dashboard after login
  
  Note: Use JWT for token management.`
  };
  onUpdateStatus() {
    // you can open another modal, toggle status, or emit an event here
    console.log('Update Status Clicked');
  }
}
export interface Task {
  id: number;
  title: string;
  status: 'Not Started' | 'Inprogress' | 'Completed' | 'Closed';
  assignee?: string;
  start_date?: Date;
  due_date?: Date;
  progress?: number;
  description?: string;
}
