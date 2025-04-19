import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Article } from '../models/news-api.model';
import { SpaceArticle, SpaceArticleResponse } from '../models/space-news.model';
import * as qs from 'querystring';

@Injectable({ providedIn: 'root' })
export class SpaceNewsService {
  private readonly BASE = 'https://api.spaceflightnewsapi.net/v4';
  private readonly URL = `${this.BASE}/articles`;

  constructor(private http: HttpClient) {}

  getArticles(
    limit = 10,
    offset = 0,
    featured?: boolean
  ): Observable<Article[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (featured != null) {
      params = params.set('featured', String(featured));
    }

    return this.http
      .get<SpaceArticleResponse>(this.URL, { params })
      .pipe(
        map(res=> res.results),
        map(results => results.map(sa => this.toArticle(sa)))
      );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http
      .get<SpaceArticle>(`${this.URL}/${id}`)
      .pipe(map(sa => this.toArticle(sa)));
  }

  private toArticle(sa: SpaceArticle): Article {

    console.log(sa);
    return {
      source:      { id: sa.id, name: sa.newsSite },
      author:      sa.authors?.[0]?.name ?? null,
      title:       sa.title,
      description: sa.summary,
      url:         sa.url,
      urlToImage:  sa.image_url,
      publishedAt: sa.published_at,
      content:     sa.summary,
    };
  }
}
