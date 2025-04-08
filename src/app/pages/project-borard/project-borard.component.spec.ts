import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBorardComponent } from './project-borard.component';

describe('ProjectBorardComponent', () => {
  let component: ProjectBorardComponent;
  let fixture: ComponentFixture<ProjectBorardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBorardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectBorardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
