import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule,NgSelectModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  public event: EventEmitter<any> = new EventEmitter();
  msg!:string;
  addTaskForm: UntypedFormGroup;
  minDate: Date = new Date();
  minEndDate: Date = new Date();
  taskId!:number;
  projectOptions = [ ];
  assigneeOptions = [];
  constructor(public activeModal: NgbActiveModal,private UserService:UserService,private ProjectService:ProjectService, private TaskService:TaskService,  private _fb: UntypedFormBuilder,) {
  this.addTaskForm = this._fb.group(
    {
      task_name: new UntypedFormControl('', Validators.required ),
      description: new UntypedFormControl('',Validators.required),
      due_date: new UntypedFormControl('',Validators.required),
      assigned_to:new UntypedFormControl(null, Validators.required),
      project_name:new UntypedFormControl(null, Validators.required),
 })
}
ngOnInit(){
  this.ProjectService.getProjectList().subscribe(
    (response:any) => {
      // console.log(response)
      this.projectOptions =response.projects.map((project: any) => ({
        id: project._id,  
  name: project.projectName,
      })
    )
    })
    this.UserService.getUserList().subscribe(
      (response:any) => {
        // console.log(response)
        this.assigneeOptions =response.users.map((user: any) => ({
          id: user._id,  
    name: user.name,
        })
      )
      })
}
 closeModal() {
  this.activeModal.close();
}
onClickSubmitAdd(data:any){

let taskdata={
  task_name:data.task_name,
  description:data.description,
  project_name:data.project_name.name,
  project_id:data.project_name.id,
user_id:data.assigned_to.id,
  assigned_to:data.assigned_to.name,
  due_date:data.due_date
}
console.log(taskdata);
  this.TaskService.addTask(taskdata).subscribe(
    (response) => {
        this.msg ='Task created successfully';
          this.triggerEvent(this.msg);
          this.activeModal.close();
}
  )
}
onValueChange(data:any){

}
projectChange(data:any){

}
triggerEvent(msg: string) {
  this.event.emit(msg);
}
}
