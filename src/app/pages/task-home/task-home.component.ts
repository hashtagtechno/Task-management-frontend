import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrl: './task-home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TaskHomeComponent implements OnInit {
  constructor(private modalService: NgbModal,private tasksService: TaskService, protected _notificationSvc: NotificationService,){

  }
  
  chartOptions: EChartsOption = {};
 tasksCount!:any;
  tasks:any;
recentTasks!:any;
p: number = 1;
newStatus!:string;
 newAction:string='';
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
      const tasksArray = data as any[];
  this.recentTasks = tasksArray.slice(-2);
    }, error => {
 
    });
    
    this.tasksService.getTasksCount().subscribe((data: any) => {
      
  this.tasksCount = data;
  // console.log(this.tasksCount)
  let statusMap: { [key: string]: { label: string; color: string } } = {
    'Not Started': { label: 'New', color: '#0b47b83d' },
    Inprogress: { label: 'Active', color: '#89c8de' },
    Completed: { label: 'Completed', color: '#0080433d' }
  };
  
  // Create xAxis labels
  const xAxisData = Object.keys(statusMap).map(key => statusMap[key].label);
  
  // Build series data
  let chartSeriesData = Object.keys(statusMap).map(key => ({
    value: this.tasksCount[key] || 0,
    itemStyle: { color: statusMap[key].color }
  }));
  this.chartOptions = {
    title: {
      text: '',
      left: 'center'
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',   
        data: ['New', 'Active', 'Completed'],
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
        data: chartSeriesData
      }
    ]
  };
    });

  }
  openTaskModal() {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Task created successfully') {
            
            this.ngOnInit();
          }
        })
  }
  getLast4Chars(id:string): string {
    return  'TZK-' + id.slice(-4);  
  }   
  updateTask(id: string, status: string) {
    if (status === "Not Started") {
      this.newStatus = "Inprogress";
      this.newAction = "Start";
    } else if (status === "Inprogress") {
      this.newStatus = "Completed";
      this.newAction = "Complete";
    }
    if(this.newAction){
      Swal.fire({
        position: 'top',
        title: `Are you sure to ${this.newAction} the task?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.newAction,
        cancelButtonText: 'Cancel',
        confirmButtonColor: 'black',
        cancelButtonColor: 'white',
      }).then((res) => {
        if (res.value) {
          this.tasksService.updateTask(id, this.newStatus).subscribe(
            (response: any) => {
              this._notificationSvc.success('', 'Updated successfully');
              this.ngOnInit();
            },
            (error: any) => {
              this._notificationSvc.error('', 'Updation failed');
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
        title: `Are you sure to delete the task?`,
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
   
  

