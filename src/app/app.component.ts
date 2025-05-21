import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loadingservice';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppLoadingComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class AppComponent { loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService,private cdRef: ChangeDetectorRef) {
    this.loading$ = this.loadingService.loading$;
  //    setTimeout(() => {
  //   this.cdRef.detectChanges();
  // });
  }
  title = 'task-management';
 ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
