import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ItemService } from '../../core/services/item.service';
import { ClaimService } from '../../core/services/claim.service';
import { NotificationService } from '../../core/services/notification.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { ChartComponent } from '../../shared/components/chart/chart';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, StatCardComponent, StatusBadgeComponent, ChartComponent],
  template: `
    <div class="admin animate-fade">
      <div class="page-header">
        <h1>Admin Panel</h1>
        <p>Manage users, items, and platform analytics.</p>
      </div>

      <div class="stats-grid">
        <app-stat-card icon="👥" [value]="auth.getAllUsers().length" label="Total Users" color="var(--primary)" />
        <app-stat-card icon="📝" [value]="itemService.lostItems().length + itemService.foundItems().length" label="Total Reports" color="var(--secondary)" />
        <app-stat-card icon="📋" [value]="claimService.claims().length" label="Total Claims" color="var(--warning)" />
        <app-stat-card icon="🔗" [value]="notifService.matches().length" label="Matches" color="var(--success)" />
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button *ngFor="let tab of tabs" class="tab" [class.active]="activeTab() === tab.id" (click)="activeTab.set(tab.id)">{{tab.icon}} {{tab.label}}</button>
      </div>

      <!-- Users Tab -->
      <div class="tab-content card" *ngIf="activeTab() === 'users'">
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Joined</th></tr></thead>
            <tbody>
              <tr *ngFor="let user of auth.getAllUsers()">
                <td><div class="user-cell"><span class="u-avatar" [style.background]="getRoleColor(user.role)">{{user.name[0]}}</span> <strong>{{user.name}}</strong></div></td>
                <td>{{user.email}}</td>
                <td><app-status-badge [status]="user.role" /></td>
                <td>{{user.department}}</td>
                <td>{{user.joinedDate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Claims Tab -->
      <div class="tab-content card" *ngIf="activeTab() === 'claims'">
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Claim ID</th><th>Item</th><th>Claimant</th><th>Submitted</th><th>Status</th></tr></thead>
            <tbody>
              <tr *ngFor="let claim of claimService.claims()">
                <td>{{claim.id}}</td>
                <td><strong>{{claim.itemName}}</strong></td>
                <td>{{claim.claimantName}}</td>
                <td>{{claim.submittedDate}}</td>
                <td><app-status-badge [status]="claim.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div class="tab-content" *ngIf="activeTab() === 'analytics'">
        <div class="analytics-grid">
          <div class="card analytics-card">
            <div class="card-header"><h3>Items by Category</h3></div>
            <div class="card-body"><app-chart type="bar" [data]="categoryData" /></div>
          </div>
          <div class="card analytics-card">
            <div class="card-header"><h3>Claims Overview</h3></div>
            <div class="card-body"><app-chart type="donut" [data]="claimStatusData" /></div>
          </div>
        </div>
      </div>

      <!-- Activity Log Tab -->
      <div class="tab-content card" *ngIf="activeTab() === 'activity'">
        <div class="activity-list">
          <div *ngFor="let log of notifService.activityLog()" class="activity-row">
            <div class="act-icon">{{getLogIcon(log.type)}}</div>
            <div class="act-info">
              <strong>{{log.action}}</strong>
              <span>{{log.details}}</span>
            </div>
            <div class="act-meta">
              <span>{{log.user}}</span>
              <span class="act-time">{{log.date | date:'short'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .tabs { display: flex; gap: 4px; margin-bottom: 16px; overflow-x: auto; }
    .tab {
      padding: 10px 20px; border-radius: var(--radius); font-size: .85rem; font-weight: 500;
      border: none; background: var(--surface); color: var(--text-secondary); cursor: pointer;
      transition: all var(--transition); white-space: nowrap; border: 1px solid var(--surface-border);
    }
    .tab:hover { color: var(--primary); }
    .tab.active { background: var(--primary); color: #fff; border-color: var(--primary); }
    .tab-content { padding: 20px; }
    .card-header { padding: 16px 20px; border-bottom: 1px solid var(--surface-border); }
    .card-header h3 { font-size: .95rem; font-weight: 600; margin: 0; }
    .card-body { padding: 20px; }
    .user-cell { display: flex; align-items: center; gap: 10px; }
    .u-avatar { width: 32px; height: 32px; border-radius: 50%; color: #fff; font-weight: 700; font-size: .8rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .activity-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--surface-border); }
    .activity-row:last-child { border-bottom: none; }
    .act-icon { font-size: 1.1rem; }
    .act-info { flex: 1; }
    .act-info strong { display: block; font-size: .85rem; }
    .act-info span { font-size: .78rem; color: var(--text-secondary); }
    .act-meta { text-align: right; }
    .act-meta span { display: block; font-size: .78rem; color: var(--text-tertiary); }
    .act-time { font-size: .7rem !important; }
    @media (max-width: 768px) { .analytics-grid { grid-template-columns: 1fr; } }
  `]
})
export class AdminComponent {
  auth = inject(AuthService);
  itemService = inject(ItemService);
  claimService = inject(ClaimService);
  notifService = inject(NotificationService);

  activeTab = signal('users');
  tabs = [
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'claims', icon: '📋', label: 'Claims' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'activity', icon: '📜', label: 'Activity Log' },
  ];

  categoryData = [
    { label: 'Electronics', value: 5, color: '#2563eb' },
    { label: 'ID/Cards', value: 3, color: '#7c3aed' },
    { label: 'Accessories', value: 3, color: '#10b981' },
    { label: 'Bags', value: 1, color: '#f59e0b' },
    { label: 'Keys', value: 1, color: '#ef4444' },
    { label: 'Other', value: 2, color: '#06b6d4' },
  ];

  claimStatusData = [
    { label: 'Pending', value: 3, color: '#f59e0b' },
    { label: 'Approved', value: 1, color: '#10b981' },
    { label: 'Rejected', value: 1, color: '#ef4444' },
  ];

  getRoleColor(role: string): string {
    return { student: '#2563eb', faculty: '#7c3aed', admin: '#ef4444' }[role] || '#64748b';
  }

  getLogIcon(type: string): string {
    return { report: '📝', claim: '📋', match: '🔗', admin: '🛡️', system: '⚙️' }[type] || '📌';
  }
}
