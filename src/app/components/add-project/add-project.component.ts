import { CommonModule } from '@angular/common';
import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, BsDatepickerModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
   encapsulation: ViewEncapsulation.None,
})
export class AddProjectComponent {
  msg!:string;
  addprojectForm: UntypedFormGroup;
    public event: EventEmitter<any> = new EventEmitter();
  minDate: Date = new Date();
  minEndDate: Date = new Date();
constructor(private fb: UntypedFormBuilder,protected _notificationSvc: NotificationService,public activeModal: NgbActiveModal,private ProjectService:ProjectService){
  this.addprojectForm = this.fb.group(
      {
        project_name: new UntypedFormControl('', Validators.required ),
        start_date: new UntypedFormControl('',Validators.required),
        due_date: new UntypedFormControl('',Validators.required),
        project_description:new UntypedFormControl(null),
   })
}
onClickSubmitProject(data:any){
  let projectdata={
    projectName:data.project_name,
    shortDescription:data.project_description,
    startDate:data.start_date,
    endDate:data.start_date,
    due_date:data.due_date
  }
    this.ProjectService.addProject(projectdata).subscribe(
      (response) => {
          this.msg ='Project created successfully';
            this.triggerEvent(this.msg);
            this._notificationSvc.success('', 'Project Created');
            this.activeModal.close();
  }
    )
}
closeModal() {
  this.activeModal.close();
}
onValueChange(data:any){

}
onValueChangeEndDate(data:any){

}
triggerEvent(msg: string) {
  this.event.emit(msg);
}

}
