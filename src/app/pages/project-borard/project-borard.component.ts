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
@Component({
  selector: 'app-project-borard',
  standalone: true,
  imports: [NotificationComponent, NgxPaginationModule,CommonModule,NgxEchartsModule,SidebarComponent, HeaderComponent
  ],
  templateUrl: './project-borard.component.html',
  styleUrl: './project-borard.component.scss'
})
export class ProjectBorardComponent implements OnInit {
  constructor(private modalService: NgbModal,private ProjectService:ProjectService){}
  chartOptions: EChartsOption = {};
  p: number = 1;
 projects:any;
recentActivities = [
  { user: 'User1', action: 'created Project 1', time: new Date() },
  { user: 'User2', action: 'completed Project 2', time: new Date() },
];
public donutChartOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  } as TooltipComponentOption,

  legend: {
    orient: 'vertical',
    left: 'left'
  } as LegendComponentOption,

  series: [
    {
      name: 'Tasks',
      type: 'pie', // ✅ use exact literal "pie"
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
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
      data: [
        { value: 4, name: 'New' },
        { value: 6, name: 'Active' },
        { value: 3, name: 'Done',itemStyle: { color: 'blue' } },
        { value: 2, name: 'Closed' }
      ]
    } as PieSeriesOption // ✅ this cast ensures proper typing
  ]

};
ngOnInit(): void {
  
  this.ProjectService.getProjects().subscribe(data => {
    this.projects = data;
    console.log(this.projects);
  }, error => {

  });
}
openProjectModal(){
    const modalRef = this.modalService.open(AddProjectComponent);
    modalRef.componentInstance.event.subscribe((data: any) => {
          if (data=='Task created successfully') {
            
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

}

}
