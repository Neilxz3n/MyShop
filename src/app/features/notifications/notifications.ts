import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notifications animate-fade">
      <div class="page-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated on your items and claims.</p>
        </div>
        <button class="btn btn-secondary btn-sm" (click)="notifService.markAllAsRead()">Mark all as read</button>
      </div>
      <div class="notif-list">
        <div *ngFor="let n of notifService.notifications()" class="notif-card card" [class.unread]="!n.read"
             (click)="notifService.markAsRead(n.id)">
          <a [routerLink]="n.link || '/notifications'" class="notif-inner">
            <span class="notif-icon">{{n.icon}}</span>
            <div class="notif-content">
              <div class="notif-top">
                <h4>{{n.title}}</h4>
                <span class="notif-type badge" [class]="getTypeClass(n.type)">{{formatType(n.type)}}</span>
              </div>
              <p>{{n.message}}</p>
              <span class="notif-time">{{formatTime(n.date)}}</span>
            </div>
            <span class="unread-dot" *ngIf="!n.read"></span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .notif-list { display: flex; flex-direction: column; gap: 8px; }
    .notif-card { transition: all var(--transition); }
    .notif-card.unread { border-left: 3px solid var(--primary); }
    .notif-inner { display: flex; align-items: flex-start; gap: 16px; padding: 18px; text-decoration: none; color: var(--text-primary); }
    .notif-icon { font-size: 1.5rem; flex-shrink: 0; }
    .notif-content { flex: 1; min-width: 0; }
    .notif-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 6px; }
    .notif-top h4 { font-size: .9rem; font-weight: 600; margin: 0; }
    .notif-content p { font-size: .85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px; }
    .notif-time { font-size: .75rem; color: var(--text-tertiary); }
    .unread-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--primary); flex-shrink: 0; margin-top: 8px; }
  `]
})
export class NotificationsComponent {
  notifService = inject(NotificationService);

  getTypeClass(type: string): string {
    const map: Record<string, string> = { match_found: 'badge-info', claim_approved: 'badge-success', claim_rejected: 'badge-error', item_update: 'badge-warning', announcement: 'badge-primary' };
    return map[type] || 'badge-primary';
  }

  formatType(type: string): string {
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  formatTime(date: string): string {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  }
}
