import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatSelectChange } from '@angular/material/select';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display donut chart when loading is true', () => {
    // Simulate loading state
    spyOn(component, 'loading').and.returnValue(true);
    fixture.detectChanges();

    const donutChart = fixture.debugElement.query(By.css('[data-donut-chart]'));
    expect(donutChart).toBeNull();
  });

  it('should display donut chart when loading is false and onSummaryYearChange is triggered', () => {
    // Simulate loading state as false
    spyOn(component, 'loading').and.returnValue(false);
    fixture.detectChanges();

    // Simulate year change event
    const event = { value: component.currentYear } as MatSelectChange;
    component.onSummaryYearChange(event);
    fixture.detectChanges();

    const donutChart = fixture.debugElement.query(By.css('[data-donut-chart]'));
    expect(donutChart).not.toBeNull();
  });


});
