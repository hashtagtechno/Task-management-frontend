import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [NgbModalModule, CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
})
export class ImageModalComponent {
  @Input() imagePath: string = '';
  @Input() modalId: string = 'imageModal';
   constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
    console.log(this.imagePath);
  }
}
