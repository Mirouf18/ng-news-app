import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private readonly ENDPOINT = 'https://newsapi.org/v2/everything';
  private readonly API_KEY = environment.newsApiKey;

  constructor(private http: HttpClient) {}

  /**
   * Fetches articles matching the given query.
   * @param query keyword or phrase to search articles for
   * @param page page number (default: 1)
   * @param pageSize number of articles per page (default: 20)
   * @param sortBy "relevancy" | "popularity" | "publishedAt" (default: "publishedAt")
   */
  getEverything(
    query: string,
    page: number = 1,
    pageSize: number = 20,
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
