import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CommonModule } from '@angular/common';
// import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption, LegendComponentOption, PieSeriesOption, TooltipComponentOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from '../../components/add-project/add-project.component';
import { ProjectService } from '../../services/project.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-project-borard',
  standalone: true,
  imports: [NotificationComponent, NgxPaginationModule,CommonModule,NgxEchartsModule,SidebarComponent, HeaderComponent
  ],
  templateUrl: './project-borard.component.html',
  styleUrl: './project-borard.component.scss'
})
export class ProjectBorardComponent implements OnInit {
  constructor(private modalService: NgbModal,protected _notificationSvc: NotificationService,private ProjectService:ProjectService){}
  chartOptions: EChartsOption = {};
  public donutChartOptions: EChartsOption = {}; // init as empty
  p: number = 1;
 projects:any;
 projectsCount:any;
 chartData!:any;
recentActivities = [
  { user: 'User1', action: 'created Project 1', time: new Date() },
  { user: 'User2', action: 'completed Project 2', time: new Date() },
];

ngOnInit(): void {
  
  this.ProjectService.getProjects().subscribe(data => {
    this.projects = data;
    // console.log(this.projects);
  }, error => {

  });
  this.ProjectService.getProjectTaskCount().subscribe((data:any) => {
    this.projectsCount = data.projects;
    // console.log('Received from API:', data);
    this.chartData = this.projectsCount.map((item: { project_name: any; number_of_task: any; }) => ({
      name: item.project_name,
      value: item.number_of_task
    }));

    // Set chart config AFTER data is ready
    this.donutChartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const v = params.value as number;
          const text = v === 1 ? 'task' : 'tasks';
          return `${params.name}: ${v} ${text}`;
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Tasks',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          // show the "3 tasks" label inside each slice
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => {
              const v = params.value as number;
              const text = v === 1 ? 'task' : 'tasks';
              return `${v} ${text}`;
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.chartData
        } as PieSeriesOption
      ]
    };
  });
}



openProjectModal(){
    const modalRef = this.modalService.open(AddProjectComponent);
    modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Project created successfully') {
            
            this.ngOnInit();
          }
        })
}
getLast4Chars(id:string): string {
  return  'PRJ-' + id.slice(-4);  // Get the last 4 characters
}   
openviewProject(id:string){
}
deleteProject(id:string){
//   Swal.fire({
//         position: 'top',
//         title: `Are you sure to delete the project?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Delete',
//         cancelButtonText: 'Cancel',
//         confirmButtonColor: 'black',
//         cancelButtonColor: 'white',
//       }).then((res) => {
//         if (res.value) {
//           this.ProjectService.deleteProject(id).subscribe(
//             (response) => {
//               this._notificationSvc.success('', 'Deleted successfully');
//              this.ngOnInit(  )
//             },
//             (error) => {
//               this._notificationSvc.error('', 'deletion Failed!');
//               this.ngOnInit();
//             }
//           );
//         } else {
//         }
//       });
//     }
}

}
