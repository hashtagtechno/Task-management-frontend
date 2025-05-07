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
  getLast4Chars(id:string): string {
    return  'TZK-' + id.slice(-4);  
  }  
  @Output() viewTask = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<{ id: string, status: string }>();

  openviewTask(taskId: string) {
    this.viewTask.emit(taskId);
  }

  deletetask(taskId: string) {
    this.deleteTask.emit(taskId);
  }

  updatetask(taskId: string, status: string) {
    this.updateTask.emit({ id: taskId, status: status });
  }
}
