import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FeatureArticleComponent } from './feature-article.component';
import { SpaceNewsService } from '../../../core/services/space-news.service';
import { Article } from '../../../core/models/news-api.model';
import { RouterLink, ActivatedRoute } from '@angular/router';


class MockSpaceNewsService {
  getArticles = jasmine.createSpy('getArticles');
}

describe('FeatureArticleComponent', () => {
  let component: FeatureArticleComponent;
  let fixture: ComponentFixture<FeatureArticleComponent>;
  let service: MockSpaceNewsService;

  const mockArticles: Article[] = [
    {
      title: 'Test 1', url: '', urlToImage: '', description: '', publishedAt: '',
      source: {
        id: 1,
        name: ''
      },
      author: null,
      content: null
    },
    {
      title: 'Test 2', url: '', urlToImage: '', description: '', publishedAt: '',
      source: {
        id: 2,
        name: ''
      },
      author: null,
      content: null
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FeatureArticleComponent, RouterLink],
      providers: [
        { provide: SpaceNewsService, useClass: MockSpaceNewsService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureArticleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SpaceNewsService) as unknown as MockSpaceNewsService;
  });

  it('should fetch articles and set the first one on init', () => {
    service.getArticles.and.returnValue(of(mockArticles));
    fixture.detectChanges();
    expect(service.getArticles).toHaveBeenCalledWith(1, 0, true);
    expect(component.article).toBe(mockArticles[0]);
  });

  it('should log an error if no articles are returned', () => {
    spyOn(console, 'error');
    service.getArticles.and.returnValue(of([]));
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith('No articles found');
    expect(component.article).toBeUndefined();
  });
});
