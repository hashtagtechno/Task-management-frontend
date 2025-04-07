import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  taskId!:string;
  task!:any;
  constructor(public activeModal: NgbActiveModal,private TaskService:TaskService){}
  ngOnInit(){
    console.log(this.taskId)
    if(this.taskId){
      this.TaskService.getTaskDetails(this.taskId).subscribe(
        (response) => {
          // console.log(response)
          this.task=response
          // console.log(this.task)
    })
  }
}
  closeModal() {
    this.activeModal.close();
  }
  getLast4Chars(id:string): string {
    return  'TZK-' + id?.slice(-4);  
  }   
  

  onUpdateStatus() {
    // you can open another modal, toggle status, or emit an event here
    // console.log('Update Status Clicked');
  }
}
export interface Task {
  _id:  string;
task_name: string;
  status: string
  assigned_to?: string;
  project_name:string,
  updatedAt: Date,
  createdAt:Date,
    due_date: Date,
  description?: string;
  __v:number;
}
