import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  template: `
    <div class="matching animate-fade">
      <div class="page-header">
        <h1>Smart Matching</h1>
        <p>AI-powered suggestions matching lost items with found items.</p>
      </div>

      <div class="match-list">
        <div *ngFor="let match of notifService.matches()" class="match-card card" [class.dismissed]="match.status === 'dismissed'">
          <div class="match-header">
            <div class="match-percent" [class]="getPercentClass(match.matchPercentage)">
              <span class="percent-value">{{match.matchPercentage}}%</span>
              <span class="percent-label">Match</span>
            </div>
            <app-status-badge [status]="match.status" />
          </div>
          <div class="match-body">
            <div class="match-items">
              <div class="match-item lost">
                <span class="mi-badge">🔍 LOST</span>
                <h4>{{match.lostItem.name}}</h4>
                <p>{{match.lostItem.description}}</p>
                <div class="mi-meta"><span>📍 {{match.lostItem.location}}</span><span>📅 {{match.lostItem.date}}</span></div>
              </div>
              <div class="match-connector">
                <span class="connector-icon">🔗</span>
              </div>
              <div class="match-item found">
                <span class="mi-badge found-badge">📦 FOUND</span>
                <h4>{{match.foundItem.name}}</h4>
                <p>{{match.foundItem.description}}</p>
                <div class="mi-meta"><span>📍 {{match.foundItem.location}}</span><span>📅 {{match.foundItem.date}}</span></div>
              </div>
            </div>
            <div class="matched-fields">
              <span class="mf-label">Matched on:</span>
              <span *ngFor="let f of match.matchedFields" class="mf-tag">{{f}}</span>
            </div>
          </div>
          <div class="match-actions" *ngIf="match.status === 'pending'">
            <button class="btn btn-success btn-sm" (click)="confirm(match.id)">✓ Confirm Match</button>
            <button class="btn btn-ghost btn-sm" (click)="dismiss(match.id)">✕ Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .match-list { display: flex; flex-direction: column; gap: 20px; }
    .match-card { padding: 24px; transition: all var(--transition); }
    .match-card.dismissed { opacity: .5; }
    .match-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .match-percent {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      width: 72px; height: 72px; border-radius: 50%; border: 3px solid;
    }
    .match-percent.high { border-color: var(--success); color: var(--success); }
    .match-percent.medium { border-color: var(--warning); color: var(--warning); }
    .match-percent.low { border-color: var(--text-tertiary); color: var(--text-tertiary); }
    .percent-value { font-size: 1.2rem; font-weight: 700; line-height: 1; }
    .percent-label { font-size: .65rem; }
    .match-items { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: stretch; }
    .match-item { padding: 16px; border-radius: var(--radius-md); }
    .match-item.lost { background: var(--error-bg); }
    .match-item.found { background: var(--success-bg); }
    .mi-badge { font-size: .7rem; font-weight: 700; letter-spacing: .05em; display: inline-block; margin-bottom: 8px; color: var(--error); }
    .found-badge { color: var(--success); }
    .match-item h4 { font-size: .9rem; font-weight: 600; margin-bottom: 6px; }
    .match-item p { font-size: .8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px; }
    .mi-meta { display: flex; flex-direction: column; gap: 4px; font-size: .75rem; color: var(--text-tertiary); }
    .match-connector { display: flex; align-items: center; justify-content: center; }
    .connector-icon { font-size: 1.5rem; }
    .matched-fields { margin-top: 16px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .mf-label { font-size: .8rem; color: var(--text-secondary); font-weight: 500; }
    .mf-tag { padding: 3px 10px; background: var(--primary-100); color: var(--primary); border-radius: var(--radius-full); font-size: .72rem; font-weight: 600; }
    .match-actions { display: flex; gap: 10px; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--surface-border); }
    @media (max-width: 700px) {
      .match-items { grid-template-columns: 1fr; }
      .match-connector { transform: rotate(90deg); }
    }
  `]
})
export class MatchingComponent {
  notifService = inject(NotificationService);
  private toast = inject(ToastService);

  getPercentClass(pct: number): string {
    if (pct >= 70) return 'high';
    if (pct >= 50) return 'medium';
    return 'low';
  }

  confirm(id: string) {
    this.notifService.confirmMatch(id);
    this.toast.success('Match confirmed!');
  }

  dismiss(id: string) {
    this.notifService.dismissMatch(id);
    this.toast.info('Match dismissed.');
  }
}
