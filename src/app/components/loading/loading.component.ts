// app-loading.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingService } from '../../services/loadingservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports:[CommonModule]
})
export class AppLoadingComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  // currentQuote: string = "Loading...";

  private context!: CanvasRenderingContext2D;
  private points: any[] = [];
  private velocity2 = 5;
  private radius = 5;
  private numberOfPoints = 30;
  private width = window.innerWidth;
  private height = window.innerHeight;

  ngAfterViewInit(): void {
  const canvas = this.canvasRef?.nativeElement;
  canvas.width = window?.innerWidth;
  canvas.height = window?.innerHeight;
  this.context = canvas.getContext('2d')!;
  this.width = canvas.width;
  this.height = canvas.height;
  this.init();
  }

  private init(): void {
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.createPoint();
    }
    this.points.forEach((point, i) => {
      point.buddy = i === 0 ? this.points[this.points.length - 1] : this.points[i - 1];
    });
    this.animate();
  }

  private createPoint(): void {
    const point: any = {};
    point.x = Math.random() * this.width;
    point.y = Math.random() * this.height;
    point.vx = (Math.random() * 2 - 1);
    const vx2 = Math.pow(point.vx, 2);
    const vy2 = this.velocity2 - vx2;
    point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
    this.points.push(point);
  }

  private resetVelocity(point: any, axis: 'x' | 'y', dir: number): void {
    if (axis === 'x') {
      point.vx = dir * Math.random();
      const vx2 = Math.pow(point.vx, 2);
      const vy2 = this.velocity2 - vx2;
      point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
    } else {
      point.vy = dir * Math.random();
      const vy2 = Math.pow(point.vy, 2);
      const vx2 = this.velocity2 - vy2;
      point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
    }
  }

  private drawCircle(x: number, y: number): void {
    this.context.beginPath();
    this.context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = '#97badc';
    this.context.fill();
  }

  private drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.strokeStyle = '#8ab2d8';
    this.context.stroke();
  }

  private draw(): void {
    for (const point of this.points) {
      point.x += point.vx;
      point.y += point.vy;
      this.drawCircle(point.x, point.y);
      this.drawLine(point.x, point.y, point.buddy.x, point.buddy.y);

      if (point.x < this.radius) {
        this.resetVelocity(point, 'x', 1);
      } else if (point.x > this.width - this.radius) {
        this.resetVelocity(point, 'x', -1);
      } else if (point.y < this.radius) {
        this.resetVelocity(point, 'y', 1);
      } else if (point.y > this.height - this.radius) {
        this.resetVelocity(point, 'y', -1);
      }
    }
  }

  private animate = (): void => {
    this.context.clearRect(0, 0, this.width, this.height);
    this.draw();
    requestAnimationFrame(this.animate);
  }


  loading$ = this.loadingService.loading$;
  quotes = [
    "Patience is also a form of action.",
    "Good things take time.",
    "Progress, not perfection.",
    "Small steps every day.",
    "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    "Focus on being productive instead of busy",
    "Your future is created by what you do today, not tomorrow",
    "Success is the sum of small efforts, repeated day in and day out"
    
  ];
  currentQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

  constructor(private loadingService: LoadingService) {}
}
