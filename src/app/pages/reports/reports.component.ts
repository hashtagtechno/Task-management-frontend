import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ScreensViewComponent } from "../../components/screens-view/screens-view.component";
import { ScreenshotComponent } from './screenshot.component';
import { ProductivityreportComponent } from '../../components/productivityreport/productivityreport.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ScreenshotComponent,ProductivityreportComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
    current_tab: string = 'productivity';
activeTab(tab: string): any {
    this.current_tab = tab;

  }
}
