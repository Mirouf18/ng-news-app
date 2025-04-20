import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../../core/models/news-api.model';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../button/button.component';
import { SpaceNewsService } from '../../../core/services/space-news.service';

@Component({
  standalone: true,
  selector: 'app-feature-article',
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './feature-article.component.html',
  styleUrls: ['./feature-article.component.scss']
})
export class FeatureArticleComponent {
  @Input() article!: Article;

  constructor(private spaceNewsService: SpaceNewsService) { }

  ngOnInit() {
    this.spaceNewsService.getArticles(1, 0, true).subscribe((articles: Article[]) => {

      if(!articles || articles.length === 0) {
        console.error('No articles found');
        return;
      }

      this.article = articles[0];
    });
  }
}
