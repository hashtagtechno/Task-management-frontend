import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { TagInputModule } from 'ngx-chips';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgSelectModule,MultiSelectComponent,FormsModule,TagInputModule,],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  
})
export class AddUserComponent {
  addUserForm:UntypedFormGroup;
    public event: EventEmitter<any> = new EventEmitter();
  selectedProjects:any;
  displayProjectNames:any;
  msg!:string;
  projectOptions!:any;
  users!:[];
  roleOptions = [
    { name: 'Developer', id: 3 },
    { name: 'Project Manager', id: 2 },
  ];
  constructor(private ProjectService:ProjectService,private fb: UntypedFormBuilder,public activeModal: NgbActiveModal, private UserService:UserService){
    this.addUserForm = this.fb.group(
          {
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            designation: [''],
            role: [null],
            projects: [[]],  
            profileImage: ['']
       })
  }

  ngOnInit(){
    this.ProjectService.getProjectList().subscribe(
      (response:any) => {
        console.log(response)
        this.projectOptions =response.projects.map((project: any) => ({
          id: project._id,  
    projectName: project.projectName,
    checked: false         
        }));
      })
  }
  closeModal(){
    this.activeModal.close();
  }
  disableTags(){
    return false;
  }
  onClickSubmitUser(data:any){
    // console.log('Form data:', data);
    let userdata={
      name:data.name,
     email:data. email,
      password:data. password,
      designation:data.designation,
      project:this.selectedProjects,
    role:data.role.name,
    }
    // console.log(userdata)
      this.UserService.addUser(userdata).subscribe(
        (response) => {
            this.msg ='User added successfully';
              this.triggerEvent(this.msg);
              this.activeModal.close();
    }
      )
  }
  updateChips(event:any){
this.selectedProjects=event;
this.displayProjectNames = this.selectedProjects?.map((p: { name: any; }) => p.name);
// console.log(this.displayProjectNames)
  }
  removeChip(event:any){}
  triggerEvent(msg: string) {
    this.event.emit(msg);
  }
  roleChange(event:AnalyserOptions){

  }
}
