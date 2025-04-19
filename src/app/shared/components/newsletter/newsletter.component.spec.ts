import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsletterComponent } from './newsletter.component';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty email and no messages', () => {
    expect(component.email).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.subscriptionMessage).toBe('');
  });

  it('should show error if email is empty', () => {
    component.email = '';
    component.subscribe();
    expect(component.errorMessage).toBe('Please enter your email.');
    expect(component.subscriptionMessage).toBe('');
  });

  it('should show error if email is invalid', () => {
    component.email = 'not-an-email';
    component.subscribe();
    expect(component.errorMessage).toBe('Please enter a valid email address.');
    expect(component.subscriptionMessage).toBe('');
  });

  it('should set subscriptionMessage and clear email on valid input', () => {
    component.email = 'user@example.com';
    component.subscribe();
    expect(component.subscriptionMessage)
      .toBe('Thank you for subscribing with user@example.com!');
    expect(component.email).toBe('');
    expect(component.errorMessage).toBe('');
  });
});
