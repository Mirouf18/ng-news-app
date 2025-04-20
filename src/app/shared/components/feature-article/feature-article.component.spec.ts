import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureArticleComponent } from './feature-article.component';
import { Article } from '../../../core/models/news-api.model';

describe('FeatureArticleComponent', () => {
  let component: FeatureArticleComponent;
  let fixture: ComponentFixture<FeatureArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureArticleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureArticleComponent);
    component = fixture.componentInstance;
  });

  it('should render when article is provided', () => {
    component.article = { title: 'Test', source: { id: null, name: 'X' }, publishedAt: new Date().toISOString(), description: 'Desc', urlToImage: '', url: '' } as Article;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('app-news-article-card');
    expect(el).toBeTruthy();
  });
});
