import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
@Component({
  selector: 'app-task-home',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent,NgxEchartsModule,CommonModule, NgxPaginationModule,FormsModule],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss'
})
export class TaskHomeComponent implements OnInit {
  constructor(private modalService: NgbModal){

  }
  chartOptions: EChartsOption = {};
  currentPage: number = 1;
 tasks = [
  { title: 'Task 1',id:1, description: 'Description of Task 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
  { title: 'Task 2',id:2, description: 'Description of Task 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Task 1',id:1, description: 'Description of Task 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
  { title: 'Task 2',id:2, description: 'Description of Task 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Task 1',id:1, description: 'Description of Task 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
  { title: 'Task 2',id:2, description: 'Description of Task 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' }
];
recentActivities = [
  { user: 'Alice', action: 'created Task 1', time: new Date() },
  { user: 'Bob', action: 'completed Task 2', time: new Date() },
];
 
  ngOnInit(): void {
    this.chartOptions = {
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {},
      xAxis: [
        {
          type: 'category',   
          data: ['Not Started', 'Inprogress', 'Completed', 'Closed']
        }
      ],
      yAxis: [
        {
          type: 'value'  
        }
      ],
      series: [
        {
          name: 'Task',
          type: 'bar',
          data: [
            { value: 5, itemStyle: { color: '#007bff' } },
            { value: 7, itemStyle: { color: '#007ba5' } },
            { value: 9, itemStyle: { color: '#007bda' } },
            { value: 8, itemStyle: { color: '#007bfd' } }
          ]
        }
      ]
    };
  }
  openTaskModal() {
  
      this.modalService.open(AddTaskComponent, { centered: true });
  }
  openviewTask(){
    
    this.modalService.open(TaskDetailsComponent, { centered: true });
  }
  
}
