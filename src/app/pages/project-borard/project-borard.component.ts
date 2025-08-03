import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CommonModule } from '@angular/common';
// import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption, LegendComponentOption, PieSeriesOption, TooltipComponentOption,GaugeSeriesOption  } from 'echarts';
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
  userInfo!:any;
authToken!:any;
  constructor(private modalService: NgbModal,protected _notificationSvc: NotificationService,private ProjectService:ProjectService){
      const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
  }
  chartOptions: EChartsOption = {};
  public donutChartOptions: EChartsOption = {}; // init as empty
  gaugeChartOptions:EChartsOption={}
  p: number = 1;
 projects:any;
 projectsCount:any;
 chartData!:any;
recentActivities = [
  { user: 'User1', action: 'created Project 1', time: new Date() },
  { user: 'User2', action: 'completed Project 2', time: new Date() },
 
];

ngOnInit(): void {
  this.gaugeChartOptions = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Project Completion',
        type: 'gauge',  // Now TypeScript knows this is exactly 'gauge'
        detail: {
          formatter: '{value}%'
        },
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        axisTick: {
          show: false    // hide ticks
        },
        splitLine: {
          show: false    // hide split lines
        },
        axisLabel: {
          show: false    // hide axis numbers/labels
        },
        pointer: {
          show: true,    // show pointer/needle
          width: 5
        },
        title: {
          show: false    // hide title
        },
        data: [
          { value: 70, name: 'Project Completion rate' }
        ]
      } as GaugeSeriesOption   // 👈 Casting here solves the typing problem
    ]
  };
  
  this.ProjectService.getProjects(this.userInfo).subscribe((data:any) => {
    this.projects = data.projects;
    console.log(this.projects);
  }, error => {

  });
  this.ProjectService.getProjectTaskCount().subscribe((data:any) => {
    this.projectsCount = data.projects;
    // console.log('Received from API:', data);
    this.chartData = this.projectsCount.map((item: { project_name: any; number_of_task: any; }) => ({
      name: item.project_name,
      value: item.number_of_task
    }));

    
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
        left: 'right',
        
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
      ],
      grid: {
        left: '10%',   // Move the chart to the left by reducing this value
        right: '15%',  // Optional: Leave space for the legend on the right
        bottom: '20%',
        top: '10%'
      }
    };
  });
}



openProjectModal(){
    const modalRef = this.modalService.open(AddProjectComponent, 
      {
      windowClass: 'wide-modal'}
    );
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
