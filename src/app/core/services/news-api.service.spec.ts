import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NewsApiService } from './news-api.service';
import { NewsApiResponse } from '../models/news-api.model';
import { environment } from '../../../environments/environment';

describe('NewsApiService', () => {
  let service: NewsApiService;
  let httpMock: HttpTestingController;
  const ENDPOINT = 'https://newsapi.org/v2/everything';
  const API_KEY = environment.newsApiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsApiService]
    });
    service = TestBed.inject(NewsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch news with default params', () => {
    const mockResponse: NewsApiResponse = {
      status: 'ok',
      totalResults: 1,
      articles: [
        {
          source: { id: null, name: 'TestSource' },
          author: 'Author',
          title: 'Title',
          description: 'Desc',
          url: 'https://test',
          urlToImage: 'https://img',
          publishedAt: '2025-04-19T00:00:00Z',
          content: 'Content'
        }
      ]
    };

    service.getEverything('angular').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === ENDPOINT &&
      request.params.get('q') === 'angular' &&
      request.params.get('apiKey') === API_KEY &&
      request.params.get('page') === '1' &&
      request.params.get('pageSize') === '20' &&
      request.params.get('sortBy') === 'publishedAt'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should accept custom page, pageSize and sortBy', () => {
    const mockResponse: NewsApiResponse = {
      status: 'ok',
      totalResults: 0,
      articles: []
    };

    service.getEverything('space', 3, 50, 'relevancy').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === ENDPOINT &&
      request.params.get('q') === 'space' &&
      request.params.get('page') === '3' &&
      request.params.get('pageSize') === '50' &&
      request.params.get('sortBy') === 'relevancy'
    );
    req.flush(mockResponse);
  });
});

describe('NewsApiService Branch Coverage', () => {
  let service: NewsApiService;
  let httpMock: HttpTestingController;
  const ENDPOINT = 'https://newsapi.org/v2/everything';
  const API_KEY = environment.newsApiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsApiService]
    });
    service = TestBed.inject(NewsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should default to sortBy=publishedAt', () => {
    const mock: NewsApiResponse = {
      status: 'ok',
      totalResults: 0,
      articles: []
    };
    service.getEverything('angular').subscribe(res => expect(res).toEqual(mock));

    const req = httpMock.expectOne(r =>
      r.url === ENDPOINT &&
      r.params.get('q') === 'angular' &&
      r.params.get('sortBy') === 'publishedAt'
    );
    req.flush(mock);
  });

  it('should accept sortBy=popularity', () => {
    const mock: NewsApiResponse = {
      status: 'ok',
      totalResults: 1,
      articles: [{
        source: { id: null, name: 'X' },
        author: 'A',
        title: 'T',
        description: 'D',
        url: 'U',
        urlToImage: 'I',
        publishedAt: '2025-01-01',
        content: 'C'
      }]
    };
    service.getEverything('test', 1, 5, 'popularity')
      .subscribe(res => {
        expect(res.articles.length).toBe(1);
        expect(res.articles[0].title).toBe('T');
      });

    const req = httpMock.expectOne(r =>
      r.url === ENDPOINT &&
      r.params.get('q') === 'test' &&
      r.params.get('pageSize') === '5' &&
      r.params.get('sortBy') === 'popularity'
    );
    expect(req.request.params.has('apiKey')).toBeTrue();
    req.flush(mock);
  });

  it('should propagate HTTP errors', () => {
    const errMsg = 'Server Error';
    service.getEverything('oops').subscribe({
      next: () => fail('should not emit next'),
      error: err => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe(errMsg);
      }
    });

    const req = httpMock.expectOne(r => r.params.get('q') === 'oops');
    req.flush(errMsg, { status: 500, statusText: errMsg });
  });
});
