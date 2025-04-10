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

recentActivities = [
  { user: 'User1', action: 'created Task 1', time: new Date() },
  { user: 'User2', action: 'completed Task 2', time: new Date() },
];
newStatus!:string;
 newAction:string='';
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
    }, error => {
 
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
            rotate: 45,
            interval: 0,  
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
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Task created successfully') {
            
            this.ngOnInit();''
          }
        })
  }
  getLast4Chars(id:string): string {
    return  'TZK-' + id.slice(-4);  
  }   
  updateTask(id: string, status: string) {
    if (status === "NOT_STARTED") {
      this.newStatus = "Inprogress";
      this.newAction = "Start";
    } else if (status === "Inprogress") {
      this.newStatus = "Completed";
      this.newAction = "Complete";
    }
    // console.log('newAction:', this.newAction); // Check the value of newAction
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
          this.tasksService.updateTask(id, this.newStatus).subscribe(
            (response: any) => {
              this.ngOnInit();
            },
            (error: any) => {
              // Error handling logic here
            }
          );
        }
      });
    }
  
  }
  
  
  openviewTask(taskId:string){
    if ( !taskId) {
      console.error('Invalid task or ID:', taskId);
      return;
    }
    else{
    
      const modalRef = this.modalService.open(TaskDetailsComponent); 
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
          this.tasksService.deleteTask(id).subscribe(
            (response) => {
              this._notificationSvc.success('', 'Deleted successfully');
             this.ngOnInit(  )
            },
            (error) => {
              this._notificationSvc.error('', 'deletion Failed!');
              this.ngOnInit();
            }
          );
        } else {
        }
      });
    }
    }
   
  

