import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule,NgSelectModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  public event: EventEmitter<any> = new EventEmitter();
  addTaskForm: UntypedFormGroup;
  minDate: Date = new Date();
  minEndDate: Date = new Date();
  taskId!:number;
  msg!:string;
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
  assigneeOptions = [
    {
      id: 0,
      name: 'User1',
    },
    {
      id: 1,
      name: 'User2',
    },
    {
      id: 2,
      name: 'User3',
    },
  ];
  
  constructor(public activeModal: NgbActiveModal, private TaskService:TaskService,  private _fb: UntypedFormBuilder,) {
  this.addTaskForm = this._fb.group(
    {
      task_name: new UntypedFormControl('', Validators.required ),
      description: new UntypedFormControl('',Validators.required),
      due_date: new UntypedFormControl('',Validators.required),
      assigned_to:new UntypedFormControl(null, Validators.required),
      project_name:new UntypedFormControl(null, Validators.required),
 })
}
 closeModal() {
  this.activeModal.close();
}
onClickSubmitAdd(data:any){
console.log(data)
let taskdata={
  task_name:data.task_name,
  description:data.description,
  project_name:data.project_name.name,
  assigned_to:data.assigned_to.name,
  due_date:data.due_date
}
  this.TaskService.addTask(taskdata).subscribe(
    (response) => {
      // this.taskId = response.task.task_id;
        this.msg ='Task created successfully';
          this.triggerEvent(this.msg);
          this.activeModal.close();
}
  )}
onValueChange(data:any){

}
projectChange(data:any){

}
triggerEvent(msg: string) {
  this.event.emit(msg);
}
}
