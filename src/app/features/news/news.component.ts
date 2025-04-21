import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from '../../shared/components/news-list/news-list.component';

@Component({
  standalone: true,
  selector: 'app-news',
  imports: [CommonModule, NewsListComponent],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {}
