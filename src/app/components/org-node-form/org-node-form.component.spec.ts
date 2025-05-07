import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgNodeFormComponent } from './org-node-form.component';

describe('OrgNodeFormComponent', () => {
  let component: OrgNodeFormComponent;
  let fixture: ComponentFixture<OrgNodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgNodeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgNodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
