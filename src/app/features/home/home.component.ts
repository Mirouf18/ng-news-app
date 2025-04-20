import { Component } from '@angular/core';
import { FeatureArticleComponent } from '../../shared/components/feature-article/feature-article.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [FeatureArticleComponent],
  standalone: true
})
export class HomeComponent {
  constructor() { }

}
