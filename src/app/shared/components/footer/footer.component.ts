import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsletterComponent } from '../newsletter/newsletter.component';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, NewsletterComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

}
