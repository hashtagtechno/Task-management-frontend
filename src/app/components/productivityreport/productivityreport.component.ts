import { Component, Input } from '@angular/core';
import { ScreenShotService } from '../../services/screen-shot.service';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption, LegendComponentOption, PieSeriesOption, TooltipComponentOption,GaugeSeriesOption  } from 'echarts';
import jsPDF from 'jspdf';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-productivityreport',
  standalone: true,
  imports: [CommonModule,NgxEchartsModule,BsDatepickerModule,FormsModule],
  templateUrl: './productivityreport.component.html',
  styleUrl: './productivityreport.component.scss',
})
export class ProductivityreportComponent {
   today = new Date();
  maxDate = new Date();
  // public donutChartOptions: EChartsOption = {}; // init as empty
public donutChartOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {d}%'
  },
  legend: {
    orient: 'vertical',
    right: '0%'
  },
  series: [
    {
      name: 'Access Source',
      type: 'pie',
      radius: ['40%', '70%'],
       center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: '{b}: {d}%',
        position: 'outside'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      data: [
        { value: 70, name: 'Development' },
        { value: 5, name: 'Entertainment' },
        { value: 4, name: 'Communication' },
        { value: 21, name: 'Others' }
      ]
    }
  ]
};

  reports!: any;
  userInfo: any;
  @Input()userId!:any;
  maxDuration = 0;
  constructor(private ScreenShotService: ScreenShotService) {
    const storedUser = localStorage.getItem('userInfo');
    this.userInfo = storedUser ? JSON.parse(storedUser) : null;
  }
   now = new Date().toISOString();
  ngOnInit() {
    this.userId;
    this.ScreenShotService.getReport(this.userId).subscribe(
      (data: any) => {
        const idleActivity: ActivityEntry = {
    appName: 'Total Idle Time',
    title: '',
    duration: data.data.totalIdleTime.seconds,
    readableDuration: data.data.totalIdleTime.readable,
    createdAt: this.now,
    updatedAt: this.now
  };
  
  data.data.activity.push(idleActivity);
        this.reports = data.data.activity;
        this.maxDuration = Math.max(...this.reports.map((a: { duration: any; }) => a.duration));
        console.log('API response:', this.reports);
      }
    );
  }
  downloadPDF() {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text('Report Title', 14, 22);

    // Add a subtitle or description
    doc.setFontSize(12);
    doc.text('This is a sample report generated with jsPDF.', 14, 32);

    // Add a simple table using autotable
  

    // Save/download the PDF
    doc.save('report.pdf');
  }
}
interface ActivityEntry {
  appName: string;
  title: string;
  duration: number;
  readableDuration: string;
  createdAt: string;
  updatedAt: string;
}