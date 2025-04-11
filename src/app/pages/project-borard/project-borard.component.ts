import { Component } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CommonModule } from '@angular/common';
// import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption, LegendComponentOption, PieSeriesOption, TooltipComponentOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-project-borard',
  standalone: true,
  imports: [NotificationComponent,CommonModule,NgxEchartsModule,SidebarComponent, HeaderComponent
  ],
  templateUrl: './project-borard.component.html',
  styleUrl: './project-borard.component.scss'
})
export class ProjectBorardComponent {
  constructor(){}
  chartOptions: EChartsOption = {};
 projects = [
  { title: 'Project 1',id:"1", description: 'Description of Project 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
  { title: 'Project 2',id:"2", description: 'Description of Project 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Project 4',id:"4", description: 'Description of Project 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Project 1',id:"1", description: 'Description of Project 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
  { title: 'Project 2',id:"2", description: 'Description of Project 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Project 4',id:"4", description: 'Description of Project 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Project 4',id:"4", description: 'Description of Project 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Project 1',id:"1", description: 'Description of Project 1', status: 'Not Started', project: 'Sprint1', due_date:'10/05/2025' },
  { title: 'Project 2',id:"2", description: 'Description of Project 2', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' },
  { title: 'Project 4',id:"4", description: 'Description of Project 4', status: 'Not Started', project: 'Sprint1',due_date:'10/05/2025' }
];
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
openProjectModal(){

}
getLast4Chars(id:string): string {
  return  'PRJ-' + id.slice(-4);  // Get the last 4 characters
}   
openviewProject(id:string){
}
deleteProject(id:string){

}
}
