import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgxOrgChartComponent } from '@ahmedaoui/ngx-org-chart';
import { OrgNodeFormComponent } from '../org-node-form/org-node-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TeamsService } from '../../pages/teams.service';
import { NotificationService } from '../../services/notification.service';
import { BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxOrgChartComponent,
    OrgNodeFormComponent,
    NgSelectModule,
    CommonModule,
    BreadcrumbModule,
  ],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss',
})
export class AddTeamComponent implements OnInit {
  @Input() initialData: any = null;
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  addTeamForm: UntypedFormGroup;
  teamLeadOptions: any[] = [];
  teamUserOptions: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private TeamsService: TeamsService,
    private _notificationSvc: NotificationService
  ) {
    this.addTeamForm = this.fb.group({
      team_name: [''],
      team_manager: [null],
      team_members: this.fb.array([]),
    });
  }

  ngOnInit() {
    console.log(this.isEditMode);
    this.loadTeamLeadOptions();
    this.loadTeamUserOptions();

    if (this.isEditMode && this.initialData) {
      this.patchForm(this.initialData);
    } else {
      // Initialize with one empty member
      this.addTeamMember();
    }
  }

  loadTeamLeadOptions() {
    this.TeamsService.getTeamLeadList().subscribe((response: any) => {
      this.teamLeadOptions = response.data.map((lead: any) => ({
        id: lead._id,
        name: lead.name,
        disabled: lead.teamName !== null,
        tooltip: lead.teamName
          ? `Already part of another Team: ${lead.teamName}`
          : ' ',
      }));
    });
  }

  loadTeamUserOptions() {
    this.TeamsService.getTeamUserList().subscribe((response: any) => {
      this.teamUserOptions = response.data.map((user: any) => ({
        id: user._id,
        name: user.name,
        teamName: user.teamName,
        disabled: user.teamName !== null,
        tooltip: user.teamName
          ? `Already part of another Team: ${user.teamName}`
          : ' ',
      }));
    });
  }

  patchForm(data: any) {
    this.addTeamForm.patchValue({
      team_name: data.teamName,
      team_manager: {
        id: data.teamLeadId,
        name: data.teamLead,
      },
    });

    const membersArray = this.fb.array([]);
    data.teamMember.forEach((member: any) => {
      membersArray.push(
        this.fb.group({
          id: [member.userId],
          name: [member.name],
        })
      );
    });
    this.addTeamForm.setControl('team_members', membersArray);
  }

  get teamMembers(): FormArray {
    return this.addTeamForm.get('team_members') as FormArray;
  }

  addTeamMember() {
    this.teamMembers.push(
      this.fb.group({
        id: [''],
        name: [''],
      })
    );
  }

  removeTeamMember(index: number) {
    this.teamMembers.removeAt(index);
  }

  onSubmit() {
    if (this.addTeamForm.valid) {
      const transformedData = {
        teamName: this.addTeamForm?.value.team_name,
        teamLead: this.addTeamForm.value.team_manager.name,
        teamLeadId: this.addTeamForm.value.team_manager.id,
        teamMember: this.addTeamForm.value.team_members.map((member: any) => ({
          userId: member.id,
          name: member.name,
          role: 'Team Member',
        })),
      };
      if (!this.isEditMode) {
        this.TeamsService.addTeam(transformedData).subscribe((response) => {
          console.log(response);
        });
      } else this.isEditMode;
      {
        this.TeamsService.editTeam(
          transformedData,
          this.initialData?._id
        ).subscribe((response) => {
          console.log(response);
        });
      }
      this.save.emit(transformedData);
    } else {
      this.addTeamForm.markAllAsTouched();
    }
  }

  onMemberSelect(member: any, index: number) {
    const control = this.teamMembers.at(index);
    control.patchValue({ name: member?.name || '' });
  }

  onCancel() {
    this.cancel.emit();
  }
}
