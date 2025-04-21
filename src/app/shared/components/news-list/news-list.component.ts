import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceNewsService } from '../../../core/services/space-news.service';
import { Article } from '../../../core/models/news-api.model';
import { NewsArticleCardComponent } from '../news-article-card/news-article-card.component';

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
  @Input() pageSize = 10;
  @Input() page = 1;
  @Input() featured?: boolean = false;

  constructor(private spaceNewsService: SpaceNewsService) {}

  ngOnInit(): void {
    this.spaceNewsService.getArticles(this.pageSize, this.page, this.featured).subscribe({
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
