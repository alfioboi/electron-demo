import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'expenses',
    loadComponent: () => import('./components/expenses.component').then(m => m.ExpensesComponent)
  },
  {
    path: 'multi-thread',
    loadComponent: () => import('./components/multi-thread.component').then(m => m.MultiThreadComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./components/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'topics',
    loadComponent: () => import('./components/topics.component').then(m => m.TopicsComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
