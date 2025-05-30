import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-task-home',
  standalone: true,
  imports: [
    SidebarComponent,
    NotificationComponent,
    AccordionComponent,
    HttpClientModule,
    HeaderComponent,
    NgxEchartsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TaskHomeComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private TaskService: TaskService,
    private cd: ChangeDetectorRef,
    private tasksService: TaskService,
    protected _notificationSvc: NotificationService
  ) {}
  private taskTimesubscription!: Subscription;
  message: string = '';
  p: number = 1;
  lineChartOptions!: EChartsOption;
  chartOptions: EChartsOption = {};
  tasksCount!: any;
  tasks: any;
  tasksArray!: any;
  recentTasks!: any;
  newStatus!: string;
  newAction: string = '';
  current_tab: string = 'alltask';
  apiCall!: any;
  taskdetails!: any;
  weeklyHours!: any;
  dailyHours!: any;
  ngOnInit(): void {
    this.current_tab = 'alltask';
    const weekDates = this.getWorkWeekDates();
    this.lineChartOptions = {
      title: {
        text: 'Total hours worked/Day',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: weekDates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Hours',
          data: [8, 7, 9, 6, 5],
          type: 'line',
          smooth: true,
        },
      ],
    };

    this.tasksService.getTasks().subscribe(
      (data) => {
        this.tasksArray = data;
        this.filterTasks();
        this.cd.detectChanges();
        // this.recentTasks = tasksArray.slice(-2);
      },
      (error) => {}
    );

    this.tasksService.getWeeklyTime('weekly').subscribe(
      (data) => {
        this.weeklyHours = data;
        // console.log("weekly", this.weeklyHours);
        // this.recentTasks = tasksArray.slice(-2);
      },
      (error) => {}
    );
    this.tasksService.getWeeklyTime('daily').subscribe(
      (data) => {
        this.dailyHours = data;
        // console.log("daily",this.dailyHours);
        // this.recentTasks = tasksArray.slice(-2);
      },
      (error) => {}
    );

    this.tasksService.getTasksCount().subscribe((data: any) => {
      this.tasksCount = data;
      // console.log(this.tasksCount)
      let statusMap: { [key: string]: { label: string; color: string } } = {
        'Not Started': { label: 'New', color: '#0b47b83d' },
        'In Progress': { label: 'Active', color: '#ea05a95c' },
        Completed: { label: 'Completed', color: 'rgb(84 112 198)' },
      };

      // Create xAxis labels
      const xAxisData = Object.keys(statusMap).map(
        (key) => statusMap[key].label
      );

      // Build series data
      let chartSeriesData = Object.keys(statusMap).map((key) => ({
        value: this.tasksCount[key] || 0,
        itemStyle: { color: statusMap[key].color },
      }));
      this.chartOptions = {
        title: {
          text: '',
          left: 'center',
        },
        tooltip: {},
        xAxis: [
          {
            type: 'category',
            data: ['New', 'Active', 'Completed'],
            axisLabel: {
              rotate: 45,
              interval: 0,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Task',
            type: 'bar',
            data: chartSeriesData,
          },
        ],
      };
    });
  }
  openTaskModal() {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.event.subscribe((data: any) => {
      if (data == 'Task created successfully') {
        this.ngOnInit();
      }
    });
  }
  filterTasks() {
    if (this.current_tab === 'alltask') {
      // console.log(this.current_tab)
      this.tasks = this.tasksArray;
      // console.log(this.tasks)
      this.cd.detectChanges();
    } else if (this.current_tab === 'due') {
      const now = new Date();
      this.tasks = this.tasksArray.filter(
        (task: { due_date: string | number | Date }) => {
          const dueDate = new Date(task.due_date);
          return dueDate < now;
        }
      );
    }
  }

  updateTask(
    id: string,
    user_id: string,
    status: string,
    action: any,
    timer_id?: any
  ) {
    console.log('action', action);
    console.log('status', status);
    console.log(timer_id);
    if (status === 'Not Started') {
      this.newStatus = 'In Progress';
      this.newAction = 'Start';
    } else if (status === 'In Progress' && action == 'tocomplete') {
      this.newStatus = 'Completed';
      this.newAction = 'Complete';
    } else if (status === 'In Progress' && action == 'topause') {
      console.log('ToPAuse');
      this.newStatus = 'Paused';
      this.newAction = 'Pause';
    } else if (status === 'Paused') {
      this.newStatus = 'Inprogress';
      this.newAction = 'Resume';
    }
    if (this.newAction) {
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
          if (this.newAction === 'Start') {
            this.apiCall = this.tasksService
              .startTask(id, user_id)
              .subscribe((response: any) => {
                const timerId = response._id;

                // 🔍 Find the task and update it
                const taskIndex = this.tasks.findIndex(
                  (task: { _id: any }) => task._id === id
                );
                if (taskIndex !== -1) {
                  this.tasks[taskIndex].tasked_timer_id = timerId;
                }
                this.ngOnInit();
                console.log(this.tasks);
              });
          } else if (this.newAction === 'Complete') {
            this.apiCall = this.tasksService.completeTask(timer_id);
          } else if (this.newAction === 'Resume') {
            this.apiCall = this.tasksService.resumeTask(timer_id);
          } else {
            console.log(this.newAction);
            this.apiCall = this.tasksService.pauseTask(timer_id);
          }

          if (this.apiCall) {
            this.apiCall.subscribe(
              (response: any) => {
                console.log(response);
                this._notificationSvc.success('', 'Updated successfully');
                this.ngOnInit(); // Or update task list selectively
              },
              (error: any) => {
                this._notificationSvc.error('', 'Updation failed');
              }
            );
          }
        }
      });
    }
  }

  onTaskSelected(task: any, duration: string): void {
       if (this.taskTimesubscription) {
        this.taskTimesubscription.unsubscribe();
        this.message = '';
      }
    if (task.task_timer_id!=null) {
   

      this.taskTimesubscription = this.TaskService.getServerSentEvent(
        task.task_timer_id
      ).subscribe({
        next: (data: any) => {
          this.message = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('SSE error', err),
      });
    } else {
      this.message = '';
      // console.log(this.message);
    }

    // console.log('Task selected in parent:', task._id);
    this.TaskService.getTaskDetails(task._id).subscribe((response) => {
      // console.log(response);
      this.taskdetails = response;
    });
  }

  openviewTask(taskId: string) {
    if (!taskId) {
      // console.error('Invalid task or ID:', taskId);
      return;
    } else {
      const modalRef = this.modalService.open(TaskDetailsComponent);
      modalRef.componentInstance.taskId = taskId;
    }
  }
  deleteTask(id: string) {
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
            this.ngOnInit();
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

  getWorkWeekDates(): string[] {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)

    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const dates = [];

    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);

      const day = nextDay.getDate().toString().padStart(2, '0');
      const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
      const year = nextDay.getFullYear();

      dates.push(`${day}/${month}/${year}`);
    }

    return dates;
  }
  activeTab(tab: string): any {
    this.current_tab = tab;

    this.p = 1;
    this.filterTasks();
  }
  ngOnDestroy(): void {
    if (this.taskTimesubscription) {
      this.taskTimesubscription.unsubscribe();
    }
  }
}
