
  import { Component, Input, Output, EventEmitter } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
  
  @Component({
    selector: 'app-org-node-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
     
    `
  })
  export class OrgNodeFormComponent {
    @Input() nodeForm!: FormGroup;
    @Output() addChild = new EventEmitter<FormArray>();
    get childNodes(): FormArray {
      return this.nodeForm.get('childs') as FormArray;
    }
    addChildNode() {
      const childsArray = this.nodeForm.get('childs') as FormArray;
      this.addChild.emit(childsArray);
    }
  }

