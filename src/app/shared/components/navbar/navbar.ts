import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationDropdownComponent],
  template: `
    <header class="navbar glass">
      <div class="navbar-left">
        <button class="btn-icon mobile-menu-btn hide-desktop" (click)="mobileMenuOpen.set(!mobileMenuOpen())">☰</button>
        <div class="search-box hide-mobile">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search items, claims..." class="search-input" />
        </div>
      </div>
      <div class="navbar-right">
        <button class="theme-toggle btn-icon" (click)="theme.toggle()" [title]="theme.darkMode() ? 'Light mode' : 'Dark mode'">
          {{theme.darkMode() ? '☀️' : '🌙'}}
        </button>
        <div class="notif-wrapper">
          <button class="btn-icon notif-btn" (click)="showNotifs.set(!showNotifs())">
            🔔
            <span class="notif-badge" *ngIf="notifService.unreadCount() > 0">{{notifService.unreadCount()}}</span>
          </button>
          <app-notification-dropdown *ngIf="showNotifs()" (close)="showNotifs.set(false)" />
        </div>
        <div class="user-menu" *ngIf="auth.currentUser() as user">
          <button class="user-btn" (click)="showUserMenu.set(!showUserMenu())">
            <div class="avatar">{{user.name[0]}}</div>
            <span class="user-name hide-mobile">{{user.name}}</span>
            <span class="chevron hide-mobile">▾</span>
          </button>
          <div class="dropdown" *ngIf="showUserMenu()" (click)="showUserMenu.set(false)">
            <a routerLink="/profile" class="dropdown-item">👤 Profile</a>
            <a routerLink="/settings" class="dropdown-item">⚙️ Settings</a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout" (click)="logout()">🚪 Logout</button>
          </div>
        </div>
      </div>
    </header>
    <!-- Mobile sidebar overlay -->
    <div class="mobile-overlay" *ngIf="mobileMenuOpen()" (click)="mobileMenuOpen.set(false)">
      <nav class="mobile-nav" (click)="$event.stopPropagation()">
        <div class="mobile-nav-header">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">CampusL&F</span>
          <button class="close-btn" (click)="mobileMenuOpen.set(false)">✕</button>
        </div>
        <a *ngFor="let item of mobileMenuItems" [routerLink]="item.route" routerLinkActive="active"
           class="mobile-nav-item" (click)="mobileMenuOpen.set(false)">
          <span>{{item.icon}}</span> {{item.label}}
        </a>
        <div class="mobile-nav-divider"></div>
        <button class="mobile-nav-item logout" (click)="logout(); mobileMenuOpen.set(false)">🚪 Logout</button>
      </nav>
    </div>
  `,
  styles: [`
    .navbar {
      height: var(--navbar-height); display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px; position: sticky; top: 0; z-index: 50; border-bottom: 1px solid var(--surface-border);
    }
    .navbar-left, .navbar-right { display: flex; align-items: center; gap: 12px; }
    .search-box {
      display: flex; align-items: center; gap: 8px; background: var(--bg-secondary);
      padding: 8px 16px; border-radius: var(--radius-full); min-width: 280px;
    }
    .search-icon { font-size: .9rem; }
    .search-input {
      border: none; background: transparent; outline: none; font-size: .875rem;
      color: var(--text-primary); width: 100%;
    }
    .btn-icon {
      width: 40px; height: 40px; border-radius: var(--radius); display: flex;
      align-items: center; justify-content: center; border: none; background: none;
      font-size: 1.1rem; cursor: pointer; transition: all var(--transition);
      color: var(--text-secondary); position: relative;
    }
    .btn-icon:hover { background: var(--bg-secondary); }
    .notif-wrapper { position: relative; }
    .notif-badge {
      position: absolute; top: 4px; right: 4px; background: var(--error); color: #fff;
      font-size: .65rem; font-weight: 700; width: 18px; height: 18px;
      border-radius: var(--radius-full); display: flex; align-items: center;
      justify-content: center; border: 2px solid var(--surface);
    }
    .user-menu { position: relative; }
    .user-btn {
      display: flex; align-items: center; gap: 8px; background: none; border: none;
      cursor: pointer; padding: 4px 8px; border-radius: var(--radius);
      transition: all var(--transition);
    }
    .user-btn:hover { background: var(--bg-secondary); }
    .avatar {
      width: 32px; height: 32px; border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: .8rem;
    }
    .user-name { font-size: .875rem; font-weight: 500; color: var(--text-primary); }
    .chevron { font-size: .7rem; color: var(--text-tertiary); }
    .dropdown {
      position: absolute; right: 0; top: calc(100% + 8px); width: 200px;
      background: var(--surface); border: 1px solid var(--surface-border);
      border-radius: var(--radius-md); box-shadow: var(--shadow-lg);
      padding: 4px; animation: scaleIn .15s ease; z-index: 200;
    }
    .dropdown-item {
      display: flex; align-items: center; gap: 8px; padding: 10px 12px;
      border-radius: var(--radius); font-size: .875rem; color: var(--text-secondary);
      border: none; background: none; width: 100%; text-align: left; cursor: pointer;
      text-decoration: none; transition: all var(--transition);
    }
    .dropdown-item:hover { background: var(--bg-secondary); color: var(--text-primary); }
    .dropdown-item.logout { color: var(--error); }
    .dropdown-divider { height: 1px; background: var(--surface-border); margin: 4px 0; }
    .mobile-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 200;
      animation: fadeIn .2s ease;
    }
    .mobile-nav {
      width: 280px; height: 100%; background: var(--surface);
      padding: 16px; animation: slideInLeft .25s ease; overflow-y: auto;
    }
    .mobile-nav-header { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
    .logo-icon { font-size: 1.4rem; }
    .logo-text { font-weight: 700; color: var(--primary); flex: 1; }
    .close-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-tertiary); }
    .mobile-nav-item {
      display: flex; align-items: center; gap: 12px; padding: 12px;
      border-radius: var(--radius); font-size: .9rem; color: var(--text-secondary);
      text-decoration: none; margin-bottom: 2px; transition: all var(--transition);
      border: none; background: none; width: 100%; cursor: pointer;
    }
    .mobile-nav-item:hover, .mobile-nav-item.active { background: var(--bg-secondary); color: var(--text-primary); }
    .mobile-nav-item.active { background: var(--primary); color: #fff; }
    .mobile-nav-item.logout { color: var(--error); }
    .mobile-nav-divider { height: 1px; background: var(--surface-border); margin: 12px 0; }
    .mobile-menu-btn { font-size: 1.3rem; }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  notifService = inject(NotificationService);
  private router = inject(Router);

  showNotifs = signal(false);
  showUserMenu = signal(false);
  mobileMenuOpen = signal(false);

  mobileMenuItems = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '🔍', label: 'Lost Items', route: '/lost-items' },
    { icon: '📦', label: 'Found Items', route: '/found-items' },
    { icon: '🔗', label: 'Matching', route: '/matching' },
    { icon: '📋', label: 'Claims', route: '/claims' },
    { icon: '🔔', label: 'Notifications', route: '/notifications' },
    { icon: '👤', label: 'Profile', route: '/profile' },
    { icon: '⚙️', label: 'Settings', route: '/settings' },
  ];

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
