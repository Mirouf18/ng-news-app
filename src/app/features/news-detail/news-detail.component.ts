import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Article } from '../../core/models/news-api.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SpaceNewsService } from '../../core/services/space-news.service';

@Component({
  standalone: true,
  selector: 'app-news-detail',
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  article?: Article;

  constructor(private route: ActivatedRoute, private spaceNewsService: SpaceNewsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const articleId = id ? Number(id) : null;

    this.fetchArticle(articleId);
  }

  private fetchArticle(articleId: number | null): void {

    if (articleId) {
      this.spaceNewsService.getArticleById(articleId).subscribe({
        next: (article: Article) => {
          this.article = article;
        },
        error: err => {
          console.error('Failed to load article:', err);
        }
      });
    } else {
      console.error('No article ID provided in the route parameters.');
    }
  }
}
