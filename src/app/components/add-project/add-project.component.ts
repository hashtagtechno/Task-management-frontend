import { Component, OnInit, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsService } from '../../pages/teams.service';
import { NotificationService } from './../../services/notification.service';
import { ProjectService } from '../../services/project.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
interface Member {
  userId: string;
  role: string;
  name: string;
  _id?: string;
}

interface Team {
  id: string;
  teamName: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
  standalone: true,
  providers: [DatePipe],
  imports:[ReactiveFormsModule, BsDatepickerModule,NgSelectModule,CommonModule]
})
export class AddProjectComponent implements OnInit {
  msg!: string;
  addprojectForm: UntypedFormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  minDate: Date = new Date();
  minEndDate: Date = new Date();
  teams: Team[] = [];
  availableMembers: Member[] = [];
  selectedMembers: Member[] = [];
  previousTeamIds: string[] = [];
  teamMembersMap: { [teamId: string]: Member[] } = {};

  constructor(
    private fb: UntypedFormBuilder,
    private teamsService: TeamsService,
    protected _notificationSvc: NotificationService,
    public activeModal: NgbActiveModal,
    private projectService: ProjectService,private datePipe: DatePipe
  ) {
    this.addprojectForm = this.fb.group({
      project_name: new UntypedFormControl('', Validators.required),
      shortDescription: new UntypedFormControl('', Validators.required),
      start_date: new UntypedFormControl('', Validators.required),
      due_date: new UntypedFormControl('', Validators.required),
      additionalInfo: new UntypedFormControl(null),
      selectedTeams: [[]],
      teamMembers: [[]],
      projectManager: [null],
      projectManagerId: [null],
    });
  }

  ngOnInit(): void {
    this.teamsService.getTeamList().subscribe((response: any) => {
      this.teams = response.map((team: any) => ({
        id: team._id,
        teamName: team.teamName,
      }));
      console.log(this.teams)
    });
  }

  onClickSubmitProject(data: any): void {
    console.log(data)
    const projectName = data.project_name;
    const shortDescription = data.shortDescription;
    const additionalInfo = data.additionalInfo || '';
    const startDate = this.datePipe.transform(data.start_date, 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(data.start_date, 'yyyy-MM-dd')
    // const endDate = this.formatDate(data.due_date);
    const selectedTeamIds: string[] = data.selectedTeams;
    const selectedMembers: Member[] = data.teamMembers;
    const projectManagerId: string = data.projectManager;
console.log(selectedMembers)
console.log(selectedTeamIds)
console.log(projectManagerId)
    const projectManager = selectedMembers.find(
      (member: Member) => member.userId === projectManagerId
    );
console.log(projectManager)
    const teams = selectedTeamIds.map((teamId: string) => {
      const team = this.teams.find((t) => t.id === teamId);
      const teamMembers = this.teamMembersMap[teamId] || [];
      const selectedTeamMembers = teamMembers.filter((member: Member) =>
        selectedMembers.some((selected: Member) => selected.userId === member.userId)
      );

      return {
        teamID: team?.id,
        teamName: team?.teamName,
        members: selectedTeamMembers.map((member: Member) => ({
          userId: member.userId,
          role: member.role,
          name: member.name,
        })),
      };
    });

    const projectData = {
      projectName,
      shortDescription,
      additionalInfo,
      projectManager: projectManager ? projectManager.name : '',
      projectManagerId: projectManager ? projectManager.userId : '',
      teams,
      startDate,
      endDate,
    };

    console.log('Final Project Data:', projectData);

 
    this.projectService.addProject(projectData).subscribe(
      (response) => {
        this.msg = 'Project created successfully';
        this.triggerEvent(this.msg);
        this._notificationSvc.success('', 'Project Created');
        this.activeModal.close();
      },
      (error) => {
        this._notificationSvc.error('', 'Project creation failed');
      }
    );
  }

  // formatDate(date: Date): string {
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // }

  closeModal(): void {
    this.activeModal.close();
  }

  onTeamsChange(currentSelection: any[]): void {
    const currentTeamIds = currentSelection.map((team) => team.id);
    const addedTeamIds = currentTeamIds.filter((id) => !this.previousTeamIds.includes(id));
    const removedTeamIds = this.previousTeamIds.filter((id) => !currentTeamIds.includes(id));

    // Handle added teams
    addedTeamIds.forEach((teamId) => {
      this.teamsService.getTeamMembers(teamId).subscribe((members: any) => {
        const teamLeadObj: Member = {
          userId: members.teamLeadId,
          role: 'teamLead',
          name: members.teamLead,
        };
        const teamMembers: Member[] = [teamLeadObj, ...members.teamMember];
        this.teamMembersMap[teamId] = teamMembers;
        this.availableMembers = [...this.availableMembers, ...teamMembers];
      });
    });

    // Handle removed teams
    removedTeamIds.forEach((teamId) => {
      const membersToRemove = this.teamMembersMap[teamId] || [];
      this.availableMembers = this.availableMembers.filter(
        (member: Member) =>
          !membersToRemove.some((m) => m.userId === member.userId)
      );
      delete this.teamMembersMap[teamId];
    });

    this.previousTeamIds = currentTeamIds;

    // Reset teamMembers and projectManager selections
    this.addprojectForm.patchValue({ teamMembers: [], projectManager: null });
    this.selectedMembers = [];
  }

  onMembersChange(selectedMembers: Member[]): void {
    console.log(this.availableMembers)
    this.selectedMembers = this.availableMembers.filter((member: Member) =>
      selectedMembers.some((selected: Member) => selected.userId === member.userId)
    );
    console.log(this.selectedMembers)
    const currentManager = this.addprojectForm.get('projectManager')?.value;
    if (!this.selectedMembers.some((member) => member.userId === currentManager)) {
      this.addprojectForm.patchValue({ projectManager: null });
    }
  }

  triggerEvent(msg: string): void {
    this.event.emit(msg);
  }
  onValueChange(data:any){

  }
  onValueChangeEndDate(data:any){
  
  }
}
