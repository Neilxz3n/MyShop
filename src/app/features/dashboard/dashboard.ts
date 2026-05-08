import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../core/services/item.service';
import { ClaimService } from '../../core/services/claim.service';
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
      <!-- ============ ADMIN DASHBOARD ============ -->
      <ng-container *ngIf="isAdmin()">
        <div class="dash-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Platform overview and management tools.</p>
          </div>
        </div>

        <div class="stats-grid">
          <app-stat-card icon="🔍" [value]="stats().totalLost" label="Lost Items" color="var(--error)" [trend]="12" />
          <app-stat-card icon="📦" [value]="stats().totalFound" label="Found Items" color="var(--success)" [trend]="8" />
          <app-stat-card icon="✅" [value]="stats().totalClaimed" label="Claimed Items" color="var(--primary)" [trend]="24" />
          <app-stat-card icon="⏳" [value]="stats().pendingClaims" label="Pending Claims" color="var(--warning)" [trend]="-5" />
          <app-stat-card icon="👥" [value]="stats().activeUsers" label="Active Users" color="var(--secondary)" />
          <app-stat-card icon="🔗" [value]="notifService.matches().length" label="Matches" color="var(--info)" />
        </div>

        <div class="dash-grid">
          <div class="card chart-card">
            <div class="card-header"><h3>Items by Category</h3></div>
            <div class="card-body"><app-chart type="bar" [data]="categoryData" /></div>
          </div>
          <div class="card chart-card">
            <div class="card-header"><h3>Item Status Overview</h3></div>
            <div class="card-body"><app-chart type="donut" [data]="statusData" /></div>
          </div>

          <div class="card activities-card">
            <div class="card-header"><h3>Recent Activities</h3><a routerLink="/notifications" class="view-all">View All</a></div>
            <div class="card-body">
              <div *ngFor="let activity of notifService.activityLog().slice(0, 6)" class="activity-row">
                <div class="activity-icon" [class]="'type-' + activity.type">{{getActivityIcon(activity.type)}}</div>
                <div class="activity-info">
                  <span class="activity-action">{{activity.action}}</span>
                  <span class="activity-detail">{{activity.details}}</span>
                </div>
                <span class="activity-time">{{formatTime(activity.date)}}</span>
              </div>
            </div>
          </div>

          <div class="card announce-card">
            <div class="card-header"><h3>📢 Announcements</h3></div>
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

          <!-- Pending Claims for Admin -->
          <div class="card recent-card" style="grid-column: 1 / -1">
            <div class="card-header"><h3>⏳ Pending Claims (Needs Review)</h3><a routerLink="/claims" class="view-all">Manage All →</a></div>
            <div class="card-body">
              <div class="table-wrapper" *ngIf="pendingClaims().length > 0">
                <table>
                  <thead><tr><th>Claim ID</th><th>Item</th><th>Claimant</th><th>Submitted</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr *ngFor="let c of pendingClaims()">
                      <td>{{c.id}}</td>
                      <td><strong>{{c.itemName}}</strong></td>
                      <td>{{c.claimantName}}</td>
                      <td>{{c.submittedDate}}</td>
                      <td><app-status-badge [status]="c.status" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="empty-inline" *ngIf="pendingClaims().length === 0">✅ No pending claims to review.</div>
            </div>
          </div>

          <div class="card recent-card" style="grid-column: 1 / -1">
            <div class="card-header"><h3>Recently Reported Lost Items</h3><a routerLink="/lost-items" class="view-all">View All →</a></div>
            <div class="card-body">
              <div class="table-wrapper">
                <table>
                  <thead><tr><th>Item</th><th>Category</th><th>Location</th><th>Date</th><th>Reporter</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr *ngFor="let item of itemService.lostItems().slice(0, 5)">
                      <td><strong>{{item.name}}</strong></td>
                      <td>{{item.category}}</td>
                      <td>{{item.location}}</td>
                      <td>{{item.date}}</td>
                      <td>{{item.contactName}}</td>
                      <td><app-status-badge [status]="item.status" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- ============ USER DASHBOARD ============ -->
      <ng-container *ngIf="!isAdmin()">
        <div class="dash-header">
          <div>
            <h1>Welcome, {{auth.currentUser()?.name}}!</h1>
            <p>Report lost or found items and track your claims.</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <a routerLink="/lost-items/report" class="action-card card">
            <span class="action-icon">🔍</span>
            <div class="action-text">
              <h3>Report Lost Item</h3>
              <p>Lost something? Report it and we'll help you find it.</p>
            </div>
            <span class="action-arrow">→</span>
          </a>
          <a routerLink="/found-items/report" class="action-card card">
            <span class="action-icon">📦</span>
            <div class="action-text">
              <h3>Report Found Item</h3>
              <p>Found something? Help return it to its owner.</p>
            </div>
            <span class="action-arrow">→</span>
          </a>
          <a routerLink="/claims" class="action-card card">
            <span class="action-icon">📋</span>
            <div class="action-text">
              <h3>Claim an Item</h3>
              <p>See a found item that's yours? Submit a claim.</p>
            </div>
            <span class="action-arrow">→</span>
          </a>
        </div>

        <!-- User Stats -->
        <div class="stats-grid stats-sm">
          <app-stat-card icon="🔍" [value]="myLostItems().length" label="My Lost Reports" color="var(--error)" />
          <app-stat-card icon="📦" [value]="myFoundItems().length" label="My Found Reports" color="var(--success)" />
          <app-stat-card icon="📋" [value]="myClaims().length" label="My Claims" color="var(--primary)" />
          <app-stat-card icon="✅" [value]="myApprovedClaims().length" label="Approved Claims" color="var(--info)" />
        </div>

        <div class="dash-grid">
          <!-- My Recent Reports -->
          <div class="card recent-card" style="grid-column: 1 / -1">
            <div class="card-header"><h3>My Recent Reports</h3><a routerLink="/lost-items" class="view-all">View All →</a></div>
            <div class="card-body">
              <div class="table-wrapper" *ngIf="myReports().length > 0">
                <table>
                  <thead><tr><th>Item</th><th>Type</th><th>Location</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr *ngFor="let item of myReports().slice(0, 5)">
                      <td><strong>{{item.name}}</strong></td>
                      <td><span class="badge" [class]="item.type === 'lost' ? 'badge-error' : 'badge-success'">{{item.type | titlecase}}</span></td>
                      <td>{{item.location}}</td>
                      <td>{{item.date}}</td>
                      <td><app-status-badge [status]="item.status" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="empty-inline" *ngIf="myReports().length === 0">You haven't reported any items yet. Use the buttons above to get started!</div>
            </div>
          </div>

          <!-- My Claims Status -->
          <div class="card recent-card" style="grid-column: 1 / -1">
            <div class="card-header"><h3>My Claims</h3><a routerLink="/claims" class="view-all">View All →</a></div>
            <div class="card-body">
              <div class="table-wrapper" *ngIf="myClaims().length > 0">
                <table>
                  <thead><tr><th>Item</th><th>Submitted</th><th>Status</th><th>Admin Notes</th></tr></thead>
                  <tbody>
                    <tr *ngFor="let c of myClaims()">
                      <td><strong>{{c.itemName}}</strong></td>
                      <td>{{c.submittedDate}}</td>
                      <td><app-status-badge [status]="c.status" /></td>
                      <td>{{c.adminNotes || '—'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="empty-inline" *ngIf="myClaims().length === 0">No claims yet. Browse <a routerLink="/found-items">Found Items</a> to claim yours.</div>
            </div>
          </div>

          <!-- Announcements -->
          <div class="card announce-card" style="grid-column: 1 / -1">
            <div class="card-header"><h3>📢 Campus Announcements</h3></div>
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
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
    .dash-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .dash-header p { color: var(--text-secondary); font-size: .9rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stats-sm { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
    .quick-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .action-card {
      display: flex; align-items: center; gap: 16px; padding: 24px; text-decoration: none;
      color: var(--text-primary); transition: all var(--transition); cursor: pointer;
    }
    .action-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
    .action-icon { font-size: 2rem; flex-shrink: 0; }
    .action-text { flex: 1; }
    .action-text h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; }
    .action-text p { font-size: .8rem; color: var(--text-tertiary); line-height: 1.4; }
    .action-arrow { font-size: 1.2rem; color: var(--primary); font-weight: 700; }
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
    .empty-inline { text-align: center; padding: 24px; color: var(--text-tertiary); font-size: .9rem; }
    .empty-inline a { color: var(--primary); font-weight: 600; }
    @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }
    @media (max-width: 480px) { .quick-actions { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);
  itemService = inject(ItemService);
  claimService = inject(ClaimService);
  notifService = inject(NotificationService);

  stats = this.itemService.stats;
  isAdmin = computed(() => this.auth.currentUser()?.role === 'admin');

  myLostItems = computed(() => {
    const uid = this.auth.currentUser()?.id;
    return this.itemService.lostItems().filter(i => i.reportedBy === uid);
  });

  myFoundItems = computed(() => {
    const uid = this.auth.currentUser()?.id;
    return this.itemService.foundItems().filter(i => i.reportedBy === uid);
  });

  myReports = computed(() => [...this.myLostItems(), ...this.myFoundItems()].sort((a, b) => b.reportedDate.localeCompare(a.reportedDate)));

  myClaims = computed(() => {
    const uid = this.auth.currentUser()?.id;
    return this.claimService.claims().filter(c => c.claimantId === uid);
  });

  myApprovedClaims = computed(() => this.myClaims().filter(c => c.status === 'approved'));

  pendingClaims = computed(() => this.claimService.claims().filter(c => c.status === 'pending'));

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
