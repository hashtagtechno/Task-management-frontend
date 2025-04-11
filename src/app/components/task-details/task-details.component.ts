import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  newStatus!:string;
 newAction:string='';
  taskId!:string;
  task!:any;
  public event: EventEmitter<any> = new EventEmitter();
    msg!:string;
  constructor(public activeModal: NgbActiveModal,private TaskService:TaskService){}
  ngOnInit(){
    // console.log(this.taskId)
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
  

  onUpdateStatus(id:string) {
    if (status === "NOT_STARTED") {
         this.newStatus = "Inprogress";
         this.newAction = "Start";
       } else if (status === "Inprogress") {
         this.newStatus = "Completed";
         this.newAction = "Complete";
       }
      //  console.log('newAction:', this.newAction); // Check the value of newAction
       if(this.newAction){
         Swal.fire({
           position: 'top',
           title: `Are you sure to ${this.newAction} the task`,
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: this.newAction,
           cancelButtonText: 'Cancel',
           confirmButtonColor: 'black',
           cancelButtonColor: 'white',
         }).then((res) => {
           if (res.value) {
             // Inside the then(), using an arrow function ensures `this` refers to the component instance
             this.TaskService.updateTask(id, this.newStatus).subscribe(
               (response: any) => {
                this.msg ='Task Updated Successfully';
                this.triggerEvent(this.msg);
                this.activeModal.close();
               },
               (error: any) => {
                 // Error handling logic here
               }
             );
           }
         });
       }
  }
  triggerEvent(msg: string) {
    this.event.emit(msg);
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
