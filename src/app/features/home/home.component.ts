import { Component, } from '@angular/core';
import { FeatureArticleComponent } from '../../shared/components/feature-article/feature-article.component';
import { NewsListComponent } from '../../shared/components/news-list/news-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [FeatureArticleComponent, NewsListComponent],
  standalone: true
})
export class HomeComponent {
  constructor() { }

}
