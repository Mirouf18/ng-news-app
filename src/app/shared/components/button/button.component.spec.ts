import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a <button> when no href is provided', () => {
    component.label = 'Click me';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button')!;
    expect(btn).toBeTruthy();
    expect(btn.textContent.trim()).toBe('Click me');
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
  });

  it('should render an <a> when href is provided', () => {
    component.href = '/test';
    component.label = 'Go';
    component.target = '_blank';
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('/test');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.textContent!.trim()).toBe('Go');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('should emit clicked for button clicks', () => {
    spyOn(component.clicked, 'emit');
    component.label = 'Press';
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.css('button'));
    btnDe.nativeElement.click();
    expect(component.clicked.emit).toHaveBeenCalledTimes(1);
  });

  

  it('should apply the className input to the host element', () => {
    component.className = 'my-btn';
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('button, a')!;
    expect(host.classList).toContain('my-btn');
  });
});
