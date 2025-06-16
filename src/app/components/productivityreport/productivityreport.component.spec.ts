import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityreportComponent } from './productivityreport.component';

describe('ProductivityreportComponent', () => {
  let component: ProductivityreportComponent;
  let fixture: ComponentFixture<ProductivityreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductivityreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductivityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
