import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ScreensViewComponent } from '../../components/screens-view/screens-view.component';
import { ScreenshotComponent } from './screenshot.component';
import { ProductivityreportComponent } from '../../components/productivityreport/productivityreport.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ScreenshotComponent, ProductivityreportComponent, CommonModule,BreadcrumbModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  current_tab: string = 'productivity';
  userId!: string | null;
  userName!: string | null;
  constructor(private route: ActivatedRoute,private breadcrumbService:BreadcrumbService) {}
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.userName = this.route.snapshot.paramMap.get('userName');
       this.breadcrumbService.set('@userReport', this.userName ?? 'User Report');
    //  this.extractBreadCrumb();
    // console.log(this.userId);
  }
  activeTab(tab: string): any {
    this.current_tab = tab;
  }
}
