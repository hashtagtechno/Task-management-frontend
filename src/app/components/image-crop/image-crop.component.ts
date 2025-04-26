import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-crop',
  standalone: true,
  imports: [],
  templateUrl: './image-crop.component.html',
  styleUrl: './image-crop.component.scss'
})
export class ImageCropComponent {
  constructor(public activeModal: NgbActiveModal,){

  }
  closeModal() {
    this.activeModal.close();
  }
  uploadImage(){}
}
