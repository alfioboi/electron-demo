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
    path: 'about',
    loadComponent: () => import('./components/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./components/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
