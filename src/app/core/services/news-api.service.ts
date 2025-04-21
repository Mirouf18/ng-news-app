import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewsApiResponse } from '../models/news-api.model';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private readonly ENDPOINT = 'https://newsapi.org/v2/everything';
  private readonly API_KEY = environment.newsApiKey;

  constructor(private http: HttpClient) {}

  getEverything(
    query: string,
    page: 1,
    pageSize = 20,
    sortBy: 'relevancy' | 'popularity' | 'publishedAt' = 'publishedAt'
  ): Observable<NewsApiResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('apiKey', this.API_KEY)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy);

    return this.http.get<NewsApiResponse>(this.ENDPOINT, { params });
  }
}
