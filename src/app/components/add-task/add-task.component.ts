import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule,NgSelectModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  addTaskForm: UntypedFormGroup;
  minDate: Date = new Date();
  minEndDate: Date = new Date();
  
  projectOptions = [
    {
      id: 0,
      name: 'Sprint1',
    },
    {
      id: 1,
      name: 'Sprint2',
    },
    {
      id: 2,
      name: 'Sprint3',
    },
  ];
 constructor(public activeModal: NgbActiveModal,  private _fb: UntypedFormBuilder,) {
  this.addTaskForm = this._fb.group(
    {
      task_name: new UntypedFormControl('',   Validators.required),
      description: new UntypedFormControl(''),
      due_date: new UntypedFormControl('', Validators.required),
      assigned_to:new UntypedFormControl('', Validators.required),
      projct_name:new UntypedFormControl('', Validators.required),
 })
}
 closeModal() {
  this.activeModal.close();
}
onClickSubmitAdd(data:any){

}
onValueChange(data:any){

}
projectChange(data:any){

}
}
