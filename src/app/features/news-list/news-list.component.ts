import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiService } from '../../core/services/news-api.service';
import { SpaceNewsService } from '../../core/services/space-news.service';
import { Article } from '../../core/models/news-api.model';
import { NewsArticleCardComponent } from '../../shared/components/news-article-card/news-article-card.component';

@Component({
  standalone: true,
  selector: 'app-news-list',
  imports: [CommonModule, NewsArticleCardComponent],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  articles: Article[] = [];
  loading = true;
  error = '';

  constructor(private newsApi: NewsApiService, private spaceNewsService: SpaceNewsService) {}

  ngOnInit(): void {
    // Fetch news articles from the News API
    /*this.newsApi.getEverything('technology').subscribe({
      next: res => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load news.';
        console.error(err);
        this.loading = false;
      }
    });*/
    // Fetch news articles from the Space News API
    this.spaceNewsService.getArticles().subscribe({
      next: res => {
        console.log('Articles:', res);
        this.articles = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load news.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
