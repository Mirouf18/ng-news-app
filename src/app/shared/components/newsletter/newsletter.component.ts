import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'app-newsletter',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  email = '';
  subscriptionMessage = '';
  errorMessage = '';

  subscribe(): void {
    this.errorMessage = '';
    this.subscriptionMessage = '';

    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.subscriptionMessage = `Thank you for subscribing with ${this.email}!`;
    this.email = '';
  }
}
