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
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../../components/notification/notification.component';
@Component({
  selector: 'app-task-home',
  standalone: true,
  imports: [SidebarComponent,NotificationComponent ,HttpClientModule,HeaderComponent,NgxEchartsModule,CommonModule, NgxPaginationModule,FormsModule],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss'
})
export class TaskHomeComponent implements OnInit {
  constructor(private modalService: NgbModal,private tasksService: TaskService, protected _notificationSvc: NotificationService,){

  }
  
  chartOptions: EChartsOption = {};
  currentPage: number = 1;
  tasks:any;
//  tasks = [
//   { title: 'Task 1',id:1, description: 'Description of Task 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
//   { title: 'Task 2',id:2, description: 'Description of Task 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
//   { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
//   { title: 'Task 1',id:1, description: 'Description of Task 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
//   { title: 'Task 2',id:2, description: 'Description of Task 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
//   { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
//   { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
//   { title: 'Task 1',id:1, description: 'Description of Task 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
//   { title: 'Task 2',id:2, description: 'Description of Task 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
//   { title: 'Task 4',id:4, description: 'Description of Task 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' }
// ];
recentActivities = [
  { user: 'User1', action: 'created Task 1', time: new Date() },
  { user: 'User2', action: 'completed Task 2', time: new Date() },
];
 
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
      // console.log(this.tasks)
    }, error => {
      // console.error('API Error:', error);
    });
  
    this.chartOptions = {
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {},
      xAxis: [
        {
          type: 'category',   
          data: ['New', 'Active', 'Completed', 'Closed'],
          axisLabel: {
            // Rotate the x-axis labels for better display
            rotate: 45,
            interval: 0,  // This ensures all labels are displayed
          }
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
    // console.log('Task created:', task);
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.event.subscribe((data: any) => {
      console.log('Task created:', data);
     
          if (data=='Task created successfully') {
            // You get the returned data here
            console.log('Returned data:',data );
            this.ngOnInit();''
          }
        })
  }
  getLast4Chars(id:string): string {
    return  'TZK-' + id.slice(-4);  // Get the last 4 characters
  }   
  
  openviewTask(taskId:string){
    if ( !taskId) {
      console.error('Invalid task or ID:', taskId);
      return;
    }
    else{
      // console.log(taskId)
     
      const modalRef = this.modalService.open(TaskDetailsComponent); // Open the modal
      // Pass data to the modal component using componentInstance
      modalRef.componentInstance.taskId = taskId;
    
    }

    }
    deleteTask(id:string){
      Swal.fire({
        position: 'top',
        title: `Are you sure to delete the task`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: 'black',
        cancelButtonColor: 'white',
      }).then((res) => {
        if (res.value) {
          // console.log('delete');
          this.tasksService.deleteTask(id).subscribe(
            (response) => {
              this._notificationSvc.success('', 'Deleted successfully');
             this.ngOnInit(  )
            },
            (error) => {
              // console.log(error);
              this._notificationSvc.error('', 'deletion Failed!');
              this.ngOnInit();
            }
          );
        } else {
          // console.log('Cancel');
        }
      });
    }
    }
   
  

