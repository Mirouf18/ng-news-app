export interface SpaceArticle {
  id:           number;
  title:        string;
  url:          string;
  image_url:     string;
  newsSite:     string;
  summary:      string;
  published_at:  string;
  updated_at:    string;
  featured:     boolean;
  launches:     { id: string; provider: string }[];
  events:       { id: string; provider: string }[];
  authors:      { name: string }[];
}

export interface SpaceArticleResponse {
  count: number;
  next:  string | null;
  previous: string | null;
  results: SpaceArticle[];
}
export interface SpaceArticleQuery {
  limit?: number;
  offset?: number;
  featured?: boolean;
}
