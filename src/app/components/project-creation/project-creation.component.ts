import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsService } from '../../pages/teams.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-project-creation',
  standalone: true,
  imports: [NgSelectModule,ReactiveFormsModule],
  templateUrl: './project-creation.component.html',
  styleUrl: './project-creation.component.scss'
})
export class ProjectCreationComponent {
  teams = []; // Populate this with your team data
  availableMembers:any = [];
  selectedMembers = [];
  projectForm: any;
// transformedMembers:any;
  constructor(private fb: FormBuilder, private teamsService: TeamsService) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      selectedTeams: [[], Validators.required],
      teamMembers: [[], Validators.required],
      projectManager: [null, Validators.required],
    });
  }
  ngOnInit(){
    this.teamsService.getTeamList().subscribe(
      (response:any) => {
        // console.log(response)
        this.teams =response.map((team: any) => ({
          id: team._id,  
    teamName:team.teamName,
        })
      )
      console.log(this.teams)
      })
  }

  onTeamsChange(selectedTeamIds: string[]) {
    // Call your API to fetch members based on selectedTeamIds
    this.teamsService.getTeamMembers(selectedTeamIds).subscribe((members:any) => {
      
        // Create the team lead object
        const teamLeadObj:any = {
          userId: members.teamLeadId,
          role: 'teamLead',
          name: members.teamLead
        }
        // Combine the team lead with the existing team members
        this.availableMembers= [teamLeadObj, ...members.teamMember];
      
      console.log(this.availableMembers)
      // this.availableMembers = members;
      // Reset teamMembers and projectManager selections
      this.projectForm.patchValue({ teamMembers: [], projectManager: null });
      this.selectedMembers = [];
    });
  }

  onMembersChange(selectedMemberIds: string[]) {
    // Update selectedMembers based on selectedMemberIds
    this.selectedMembers = this.availableMembers.filter((member: { id: string; }) => selectedMemberIds.includes(member.id));
    // Reset projectManager if the current selection is not in the new list
    const currentManager = this.projectForm.get('projectManager')?.value;
    if (!selectedMemberIds.includes(currentManager)) {
      this.projectForm.patchValue({ projectManager: null });
    }
  }
}
