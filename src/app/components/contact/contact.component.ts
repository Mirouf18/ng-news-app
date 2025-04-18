import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component'; // Adjust path if needed
import { ContactCardComponent } from '../contact-card/contact-card.component';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ButtonComponent, ContactCardComponent]
})
export class ContactComponent {
  constructor() { }

  onButtonClicked(event: Event): void {
    console.log('Button clicked', event);
    alert('Button clicked!');
  }
}
