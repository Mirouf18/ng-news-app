import { Routes } from '@angular/router';
import { NewsComponent } from './features/news/news.component';
import { ContactComponent } from './features/contact/contact.component';
import { NewsDetailComponent } from './features/news-detail/news-detail.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news-detail/:id', component: NewsDetailComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
