import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  @Input() tasks: any[] = []; 
  @Input() p: number = 1;
  @Output() taskSelected = new EventEmitter<string>();
  duration!:string;
  selectedTaskId: string | null = null;
  getLast4Chars(id:string): string {
    return  'TZK-' + id.slice(-4);  
  }  
  @Output() viewTask = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<{ id: string, user_id: string,status:string,timer_id?:string ,action?:string }>();

  openviewTask(taskId: string) {
    this.viewTask.emit(taskId);
  }

  deletetask(taskId: string) {
    this.deleteTask.emit(taskId);
  }

  updatetask(taskId: string, user_id: string,status:string,action:string,timer_id?:string) {
    console.log(taskId, user_id,status,action,timer_id);
    console.log(action)
    this.updateTask.emit({ id: taskId, user_id: user_id,status,timer_id,action});
  }
  onTaskClick(task:any){
    // console.log(task)
    this.selectedTaskId = task._id;
    this.taskSelected.emit(task);
    // console.log('task', task);
  }
  
}
