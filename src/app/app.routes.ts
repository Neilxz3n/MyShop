import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.AboutComponent) },
  {
    path: '',
    loadComponent: () => import('./shared/layouts/auth-layout/auth-layout').then(m => m.AuthLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password/reset-password').then(m => m.ResetPasswordComponent) },
    ]
  },
  {
    path: '',
    loadComponent: () => import('./shared/layouts/main-layout/main-layout').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'lost-items', loadComponent: () => import('./features/lost-items/lost-items').then(m => m.LostItemsComponent) },
      { path: 'lost-items/report', loadComponent: () => import('./features/lost-items/report-lost/report-lost').then(m => m.ReportLostComponent) },
      { path: 'found-items', loadComponent: () => import('./features/found-items/found-items').then(m => m.FoundItemsComponent) },
      { path: 'found-items/report', loadComponent: () => import('./features/found-items/report-found/report-found').then(m => m.ReportFoundComponent) },
      { path: 'claims', loadComponent: () => import('./features/claims/claims').then(m => m.ClaimsComponent) },
      { path: 'matching', loadComponent: () => import('./features/matching/matching').then(m => m.MatchingComponent) },
      { path: 'notifications', loadComponent: () => import('./features/notifications/notifications').then(m => m.NotificationsComponent) },
      { path: 'profile', loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings').then(m => m.SettingsComponent) },
      { path: 'email-templates', loadComponent: () => import('./features/email-templates/email-templates').then(m => m.EmailTemplatesComponent) },
      { path: 'admin', loadComponent: () => import('./features/admin/admin').then(m => m.AdminComponent), canActivate: [adminGuard] },
    ]
  },
  { path: '**', redirectTo: '' },
];
