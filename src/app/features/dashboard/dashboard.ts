import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../core/services/item.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card';
import { ChartComponent } from '../../shared/components/chart/chart';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, StatCardComponent, ChartComponent, StatusBadgeComponent],
  template: `
    <div class="dashboard animate-fade">
      <div class="dash-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {{auth.currentUser()?.name}}! Here's your campus overview.</p>
        </div>
        <div class="dash-actions">
          <a routerLink="/lost-items/report" class="btn btn-primary">+ Report Lost</a>
          <a routerLink="/found-items/report" class="btn btn-secondary">+ Report Found</a>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <app-stat-card icon="🔍" [value]="stats().totalLost" label="Lost Items" color="var(--error)" [trend]="12" />
        <app-stat-card icon="📦" [value]="stats().totalFound" label="Found Items" color="var(--success)" [trend]="8" />
        <app-stat-card icon="✅" [value]="stats().totalClaimed" label="Claimed Items" color="var(--primary)" [trend]="24" />
        <app-stat-card icon="⏳" [value]="stats().pendingClaims" label="Pending Claims" color="var(--warning)" [trend]="-5" />
      </div>

      <div class="dash-grid">
        <!-- Charts -->
        <div class="card chart-card">
          <div class="card-header">
            <h3>Items by Category</h3>
          </div>
          <div class="card-body">
            <app-chart type="bar" [data]="categoryData" />
          </div>
        </div>

        <div class="card chart-card">
          <div class="card-header">
            <h3>Item Status Overview</h3>
          </div>
          <div class="card-body">
            <app-chart type="donut" [data]="statusData" />
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="card activities-card">
          <div class="card-header">
            <h3>Recent Activities</h3>
            <a routerLink="/notifications" class="view-all">View All</a>
          </div>
          <div class="card-body">
            <div *ngFor="let activity of notifService.activityLog().slice(0, 6)" class="activity-row">
              <div class="activity-icon" [class]="'type-' + activity.type">
                {{getActivityIcon(activity.type)}}
              </div>
              <div class="activity-info">
                <span class="activity-action">{{activity.action}}</span>
                <span class="activity-detail">{{activity.details}}</span>
              </div>
              <span class="activity-time">{{formatTime(activity.date)}}</span>
            </div>
          </div>
        </div>

        <!-- Announcements -->
        <div class="card announce-card">
          <div class="card-header">
            <h3>📢 Announcements</h3>
          </div>
          <div class="card-body">
            <div *ngFor="let a of notifService.announcements()" class="announce-item">
              <div class="announce-priority" [class]="'priority-' + a.priority"></div>
              <div class="announce-content">
                <h4>{{a.title}}</h4>
                <p>{{a.message}}</p>
                <span class="announce-meta">{{a.author}} · {{a.date}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Lost Items -->
        <div class="card recent-card" style="grid-column: 1 / -1">
          <div class="card-header">
            <h3>Recently Reported Lost Items</h3>
            <a routerLink="/lost-items" class="view-all">View All →</a>
          </div>
          <div class="card-body">
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr><th>Item</th><th>Category</th><th>Location</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of itemService.lostItems().slice(0, 5)">
                    <td><strong>{{item.name}}</strong></td>
                    <td>{{item.category}}</td>
                    <td>{{item.location}}</td>
                    <td>{{item.date}}</td>
                    <td><app-status-badge [status]="item.status" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
    .dash-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .dash-header p { color: var(--text-secondary); font-size: .9rem; }
    .dash-actions { display: flex; gap: 10px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--surface-border); }
    .card-header h3 { font-size: .95rem; font-weight: 600; margin: 0; }
    .view-all { font-size: .8rem; color: var(--primary); font-weight: 500; }
    .card-body { padding: 20px 24px; }
    .chart-card { overflow: hidden; }
    .activity-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--surface-border); }
    .activity-row:last-child { border-bottom: none; }
    .activity-icon { width: 36px; height: 36px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; background: var(--bg-secondary); }
    .type-report { background: var(--primary-100); }
    .type-claim { background: var(--warning-bg); }
    .type-match { background: var(--info-bg); }
    .type-admin { background: var(--success-bg); }
    .type-system { background: var(--bg-tertiary); }
    .activity-info { flex: 1; min-width: 0; }
    .activity-action { display: block; font-size: .85rem; font-weight: 500; }
    .activity-detail { display: block; font-size: .78rem; color: var(--text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .activity-time { font-size: .72rem; color: var(--text-tertiary); white-space: nowrap; }
    .announce-item { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--surface-border); }
    .announce-item:last-child { border-bottom: none; }
    .announce-priority { width: 4px; border-radius: 2px; flex-shrink: 0; }
    .priority-high { background: var(--error); }
    .priority-medium { background: var(--warning); }
    .priority-low { background: var(--info); }
    .announce-content h4 { font-size: .85rem; font-weight: 600; margin-bottom: 4px; }
    .announce-content p { font-size: .8rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 4px; }
    .announce-meta { font-size: .72rem; color: var(--text-tertiary); }
    @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }
    @media (max-width: 480px) { .dash-actions { flex-direction: column; width: 100%; } .dash-actions .btn { width: 100%; } }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);
  itemService = inject(ItemService);
  notifService = inject(NotificationService);

  stats = this.itemService.stats;

  categoryData = [
    { label: 'Electronics', value: 5, color: '#2563eb' },
    { label: 'ID/Cards', value: 3, color: '#7c3aed' },
    { label: 'Bags', value: 2, color: '#10b981' },
    { label: 'Keys', value: 2, color: '#f59e0b' },
    { label: 'Books', value: 1, color: '#ef4444' },
    { label: 'Accessories', value: 3, color: '#06b6d4' },
  ];

  statusData = [
    { label: 'Pending', value: 9, color: '#f59e0b' },
    { label: 'Matched', value: 2, color: '#06b6d4' },
    { label: 'Claimed', value: 1, color: '#10b981' },
    { label: 'Returned', value: 1, color: '#2563eb' },
  ];

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = { report: '📝', claim: '📋', match: '🔗', admin: '🛡️', system: '⚙️' };
    return icons[type] || '📌';
  }

  formatTime(date: string): string {
    const now = new Date();
    const d = new Date(date);
    const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
    if (diffMin < 60) return `${diffMin}m`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h`;
    return `${Math.floor(diffMin / 1440)}d`;
  }
}
