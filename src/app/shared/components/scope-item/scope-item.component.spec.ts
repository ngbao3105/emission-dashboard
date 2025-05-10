import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScopeItemComponent } from './scope-item.component';

describe('ScopeItemComponent', () => {
  let component: ScopeItemComponent;
  let fixture: ComponentFixture<ScopeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScopeItemComponent]
    });
    fixture = TestBed.createComponent(ScopeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    expect(component.color()).toEqual('');
    expect(component.title()).toEqual('');
    expect(component.value()).toEqual(0);
  });

  it('should display the correct information', () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.componentRef.setInput('title', 'Scope 1');
    fixture.componentRef.setInput('value', 22000);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const colorEl = compiled.querySelector('[data-color]') as HTMLElement;
    const titleEl = compiled.querySelector('[data-title]') as HTMLElement;
    const valueEl = compiled.querySelector('[data-value]') as HTMLElement;

    expect(colorEl.style.backgroundColor).toEqual('red');
    expect(titleEl.textContent).toContain('Scope 1');
    expect(valueEl.textContent).toContain('22,000');
  });
});
