import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SpaceNewsService } from './space-news.service';
import { Article } from '../models/news-api.model';
import { SpaceArticleResponse, SpaceArticle } from '../models/space-news.model';

describe('SpaceNewsService', () => {
  let service: SpaceNewsService;
  let httpMock: HttpTestingController;
  const BASE = 'https://api.spaceflightnewsapi.net/v4';
  const URL = `${BASE}/articles`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpaceNewsService]
    });
    service = TestBed.inject(SpaceNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  const sampleSpaceArticle: SpaceArticle = {
    id: 101,
    title: 'Test Space Title',
    url: 'https://space.test/article/101',
    image_url: 'https://space.test/img.jpg',
    newsSite: 'SpaceTest',
    summary: 'A test summary',
    published_at: '2025-04-19T12:00:00Z',
    updated_at: '2025-04-19T12:10:00Z',
    featured: true,
    launches: [],
    events: [],
    authors: [{ name: 'Tester' }]
  };
  const wrappedResponse: SpaceArticleResponse = {
    count: 1,
    next: null,
    previous: null,
    results: [ sampleSpaceArticle ]
  };

  it('should fetch articles WITHOUT featured param by default', () => {
    service.getArticles(5, 2).subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].title).toBe('Test Space Title');
      // mapped fields
      expect(res[0].source.id).toBe(101);
      expect(res[0].source.name).toBe('SpaceTest');
      expect(res[0].description).toBe('A test summary');
    });

    const req = httpMock.expectOne(r =>
      r.url === URL &&
      r.params.get('limit') === '5' &&
      r.params.get('offset') === '2' &&
      !r.params.has('featured')
    );
    expect(req.request.method).toBe('GET');
    req.flush(wrappedResponse);
  });

  it('should include featured=false when explicitly set', () => {
    service.getArticles(3, 0, false).subscribe();
    const req = httpMock.expectOne(r =>
      r.params.get('limit') === '3' &&
      r.params.get('offset') === '0' &&
      r.params.get('featured') === 'false'
    );
    req.flush(wrappedResponse);
  });

  it('should include featured=true when explicitly set', () => {
    service.getArticles(1, 1, true).subscribe();
    const req = httpMock.expectOne(r =>
      r.params.get('limit') === '1' &&
      r.params.get('offset') === '1' &&
      r.params.get('featured') === 'true'
    );
    req.flush(wrappedResponse);
  });

  it('should error when getArticles fails', () => {
    const errMsg = 'Network error';
    service.getArticles().subscribe({
      next: () => fail('should not succeed'),
      error: err => expect(err.statusText).toBe(errMsg)
    });
    const req = httpMock.expectOne(URL + '?limit=10&offset=0');
    req.flush(errMsg, { status: 500, statusText: errMsg });
  });

  it('should fetch single article by ID and map correctly', () => {
    service.getArticleById(101).subscribe((article: Article) => {
      expect(article.title).toBe('Test Space Title');
      expect(article.source.id).toBe(101);
      expect(article.source.name).toBe('SpaceTest');
      expect(article.author).toBe('Tester');
      expect(article.urlToImage).toBe('https://space.test/img.jpg');
    });

    const req = httpMock.expectOne(`${URL}/101`);
    expect(req.request.method).toBe('GET');
    req.flush(sampleSpaceArticle);
  });

  it('should handle null author gracefully', () => {
    service.getArticleById(101).subscribe((article: Article) => {
      expect(article.title).toBe('Test Space Title');
      expect(article.source.id).toBe(101);
      expect(article.source.name).toBe('SpaceTest');
      expect(article.author).toBeNull(); // Expect author to be null
      expect(article.urlToImage).toBe('https://space.test/img.jpg');
    });

    const req = httpMock.expectOne(`${URL}/101`);
    expect(req.request.method).toBe('GET');
    req.flush({ ...sampleSpaceArticle, authors: [{ name: null }] });
  });
  it('should return null for author if no authors are present', () => {
    service.getArticleById(101).subscribe((article: Article) => {
      expect(article.author).toBeNull(); // Expect author to be null
    });

    const req = httpMock.expectOne(`${URL}/101`);
    expect(req.request.method).toBe('GET');
    req.flush({ ...sampleSpaceArticle, authors: [] }); // Mock response with empty authors
  });

  it('should return null for author if authors is an empty array', () => {
    service.getArticleById(101).subscribe((article: Article) => {
      expect(article.author).toBeNull(); // Expect author to be null
    });

    const req = httpMock.expectOne(`${URL}/101`);
    expect(req.request.method).toBe('GET');
    req.flush({ ...sampleSpaceArticle, authors: [] }); // Mock response with empty authors
  });
  it('should return null for author if authors is an empty string', () => {

    service.getArticleById(101).subscribe((article: Article) => {
      expect(article.author).toBeNull();
    });

    const req = httpMock.expectOne(`${URL}/101`);
    expect(req.request.method).toBe('GET');
    req.flush({ ...sampleSpaceArticle, authors: '' });
  });
  it('should return null for author if authors is an object', () => {
    service.getArticleById(101).subscribe((article: Article) => {
      expect(article.author).toBeNull();
    });

    const req = httpMock.expectOne(`${URL}/101`);
    expect(req.request.method).toBe('GET');
    req.flush({ ...sampleSpaceArticle, authors: {} });
  });
  it('should error when getArticleById fails', () => {
    const errMsg = 'Not found';
    service.getArticleById(999).subscribe({
      next: () => fail('should not succeed'),
      error: err => expect(err.statusText).toBe(errMsg)
    });
    const req = httpMock.expectOne(`${URL}/999`);
    req.flush(errMsg, { status: 404, statusText: errMsg });
  });
});
