import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [DragDropModule,CommonModule,HeaderComponent,SidebarComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})



export class KanbanBoardComponent {
  taskList:Task[];
  newTasks:Task[];
  activeTasks:Task[];
  doneTasks:Task[];
  closedTasks:Task[];
  constructor(){
    this.taskList = [
      {
        id: 1,
        title: 'Design homepage',
        task_status: 'New',
        assignee: 'Alice',
        due_date: '2025-04-10',
        progress: 0
      },
      {
        id: 2,
        title: 'Implement login API',
        task_status: 'Active',
        assignee: 'Bob',
        due_date: '2025-04-12',
        progress: 40
      },
      {
        id: 3,
        title: 'Fix footer bug',
        task_status: 'Done',
        assignee: 'Charlie',
        due_date: '2025-04-03',
        progress: 100
      },
      {
        id: 4,
        title: 'Client review feedback',
        task_status: 'Closed',
        assignee: 'Diana',
        due_date: '2025-03-29',
        progress: 100
      }
    ];
    
    this.newTasks = this.taskList.filter(task => task.task_status === 'New');
   this. activeTasks = this.taskList.filter(task => task.task_status === 'Active');
    this.doneTasks = this.taskList.filter(task => task.task_status === 'Done');
    this.closedTasks = this.taskList.filter(task => task.task_status === 'Closed');  
  }
 
  drop(event: CdkDragDrop<any[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      movedTask.task_status = status;
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  getList(column: any): any[] {
    return column.task || [];
  }
}
export interface Task {
  id: number;
  title: string;
  task_status: string;
  assignee: string;
  due_date: string;
  progress: number;
}
