import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensViewComponent } from './screens-view.component';

describe('ScreensViewComponent', () => {
  let component: ScreensViewComponent;
  let fixture: ComponentFixture<ScreensViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreensViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreensViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
