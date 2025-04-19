import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() iconSrc: string = '';
  @Input() altText: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
