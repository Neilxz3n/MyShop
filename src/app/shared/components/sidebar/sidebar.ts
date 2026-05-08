import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <div class="sidebar-header">
        <div class="logo" (click)="collapsed.set(!collapsed())">
          <span class="logo-icon">🎓</span>
          <span class="logo-text" *ngIf="!collapsed()">CampusL&F</span>
        </div>
        <button class="toggle-btn" (click)="collapsed.set(!collapsed())" [attr.aria-label]="collapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
          <span class="toggle-icon" [class.rotated]="collapsed()">‹</span>
        </button>
      </div>
      <nav class="sidebar-nav">
        <a *ngFor="let item of menuItems" [routerLink]="item.route" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: item.exact || false}" class="nav-item" [title]="item.label">
          <span class="nav-icon">{{item.icon}}</span>
          <span class="nav-label" *ngIf="!collapsed()">{{item.label}}</span>
        </a>
        <div class="nav-divider" *ngIf="auth.currentUser()?.role === 'admin'"></div>
        <a *ngIf="auth.currentUser()?.role === 'admin'" routerLink="/admin" routerLinkActive="active"
           class="nav-item" title="Admin Panel">
          <span class="nav-icon">⚙️</span>
          <span class="nav-label" *ngIf="!collapsed()">Admin Panel</span>
        </a>
      </nav>
      <div class="sidebar-footer" *ngIf="!collapsed()">
        <div class="user-card" *ngIf="auth.currentUser() as user">
          <div class="user-avatar">{{user.name[0]}}</div>
          <div class="user-info">
            <span class="user-name">{{user.name}}</span>
            <span class="user-role">{{user.role | titlecase}}</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width); height: 100vh; position: fixed; left: 0; top: 0; z-index: 100;
      background: var(--surface); border-right: 1px solid var(--surface-border);
      display: flex; flex-direction: column; transition: width var(--transition-slow);
      box-shadow: var(--shadow);
    }
    .sidebar.collapsed { width: var(--sidebar-collapsed); }
    .sidebar-header {
      padding: 16px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid var(--surface-border); min-height: 64px;
    }
    .logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .logo-icon { font-size: 1.5rem; }
    .logo-text { font-weight: 700; font-size: 1.1rem; color: var(--primary); white-space: nowrap; }
    .toggle-btn {
      background: none; border: none; width: 28px; height: 28px; border-radius: var(--radius);
      display: flex; align-items: center; justify-content: center; color: var(--text-tertiary);
      transition: all var(--transition);
    }
    .toggle-btn:hover { background: var(--bg-secondary); color: var(--text-primary); }
    .toggle-icon { font-size: 1.2rem; transition: transform var(--transition-slow); display: inline-block; }
    .toggle-icon.rotated { transform: rotate(180deg); }
    .sidebar-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
    .nav-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: var(--radius);
      color: var(--text-secondary); text-decoration: none; margin-bottom: 2px;
      transition: all var(--transition); white-space: nowrap;
    }
    .nav-item:hover { background: var(--bg-secondary); color: var(--text-primary); }
    .nav-item.active {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.3);
    }
    .nav-icon { font-size: 1.2rem; min-width: 24px; text-align: center; }
    .nav-label { font-size: .875rem; font-weight: 500; }
    .nav-divider { height: 1px; background: var(--surface-border); margin: 8px 12px; }
    .sidebar-footer { padding: 12px; border-top: 1px solid var(--surface-border); }
    .user-card { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: var(--radius); }
    .user-avatar {
      width: 36px; height: 36px; border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: .85rem; flex-shrink: 0;
    }
    .user-info { display: flex; flex-direction: column; overflow: hidden; }
    .user-name { font-size: .8rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-role { font-size: .7rem; color: var(--text-tertiary); }
    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.collapsed { transform: translateX(-100%); }
    }
  `]
})
export class SidebarComponent {
  auth = inject(AuthService);
  collapsed = signal(false);

  menuItems = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard', exact: true },
    { icon: '🔍', label: 'Lost Items', route: '/lost-items', exact: false },
    { icon: '📦', label: 'Found Items', route: '/found-items', exact: false },
    { icon: '🔗', label: 'Matching', route: '/matching', exact: false },
    { icon: '📋', label: 'Claims', route: '/claims', exact: false },
    { icon: '🔔', label: 'Notifications', route: '/notifications', exact: false },
    { icon: '👤', label: 'Profile', route: '/profile', exact: false },
    { icon: '⚡', label: 'Settings', route: '/settings', exact: false },
  ];
}
