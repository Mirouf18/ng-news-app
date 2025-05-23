import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../../core/models/news-api.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'app-news-article-card',
  imports: [CommonModule, DatePipe, RouterLink, ButtonComponent],
  templateUrl: './news-article-card.component.html',
  styleUrls: ['./news-article-card.component.scss']
})
export class NewsArticleCardComponent {
  @Input() article!: Article;
  @Input() className = '';
  @Input() featured = false;

  @HostBinding('class.featured-article')
  get isFeatured() {
    return !!this.featured;
  }
}
