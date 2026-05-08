import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notif-dropdown card">
      <div class="notif-header">
        <h4>Notifications</h4>
        <button class="mark-all" (click)="notifService.markAllAsRead()">Mark all read</button>
      </div>
      <div class="notif-list">
        <div *ngFor="let n of notifService.notifications().slice(0, 6)" class="notif-item"
             [class.unread]="!n.read" (click)="notifService.markAsRead(n.id); close.emit()">
          <a [routerLink]="n.link || '/notifications'" class="notif-link">
            <span class="notif-icon">{{n.icon}}</span>
            <div class="notif-content">
              <span class="notif-title">{{n.title}}</span>
              <span class="notif-msg">{{n.message}}</span>
              <span class="notif-time">{{formatTime(n.date)}}</span>
            </div>
            <span class="unread-dot" *ngIf="!n.read"></span>
          </a>
        </div>
      </div>
      <a routerLink="/notifications" class="view-all" (click)="close.emit()">View all notifications →</a>
    </div>
  `,
  styles: [`
    .notif-dropdown {
      position: absolute; right: 0; top: calc(100% + 8px); width: 380px;
      box-shadow: var(--shadow-xl); animation: scaleIn .15s ease; z-index: 200; overflow: hidden;
    }
    .notif-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px; border-bottom: 1px solid var(--surface-border);
    }
    .notif-header h4 { font-size: .95rem; font-weight: 600; margin: 0; }
    .mark-all {
      background: none; border: none; color: var(--primary); font-size: .8rem;
      cursor: pointer; font-weight: 500;
    }
    .notif-list { max-height: 360px; overflow-y: auto; }
    .notif-item { border-bottom: 1px solid var(--surface-border); }
    .notif-item.unread { background: var(--primary-50); }
    .notif-link {
      display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;
      text-decoration: none; color: var(--text-primary); transition: background var(--transition);
      position: relative;
    }
    .notif-link:hover { background: var(--surface-hover); }
    .notif-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
    .notif-content { flex: 1; min-width: 0; }
    .notif-title { display: block; font-weight: 600; font-size: .85rem; margin-bottom: 2px; }
    .notif-msg { display: block; font-size: .8rem; color: var(--text-secondary); line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    .notif-time { display: block; font-size: .72rem; color: var(--text-tertiary); margin-top: 4px; }
    .unread-dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--primary); flex-shrink: 0; margin-top: 6px; }
    .view-all {
      display: block; text-align: center; padding: 12px; font-size: .85rem;
      color: var(--primary); font-weight: 500; border-top: 1px solid var(--surface-border);
    }
    .view-all:hover { background: var(--surface-hover); }
    @media (max-width: 480px) { .notif-dropdown { width: calc(100vw - 32px); right: -60px; } }
  `]
})
export class NotificationDropdownComponent {
  notifService = inject(NotificationService);
  close = output<void>();

  formatTime(date: string): string {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000 / 60);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  }
}
