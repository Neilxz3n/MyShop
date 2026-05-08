import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card card" [style.--accent]="color()">
      <div class="stat-icon">{{icon()}}</div>
      <div class="stat-info">
        <span class="stat-value">{{value()}}</span>
        <span class="stat-label">{{label()}}</span>
      </div>
      <div class="stat-trend" *ngIf="trend()">
        <span [class]="trend()! > 0 ? 'trend-up' : 'trend-down'">
          {{trend()! > 0 ? '↑' : '↓'}} {{abs(trend()!)}}%
        </span>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      padding: 24px; display: flex; align-items: flex-start; gap: 16px;
      position: relative; overflow: hidden; transition: all var(--transition);
    }
    .stat-card::before {
      content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
      background: var(--accent, var(--primary)); border-radius: 0 4px 4px 0;
    }
    .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
    .stat-icon {
      width: 48px; height: 48px; border-radius: var(--radius-md);
      background: var(--bg-secondary); display: flex; align-items: center;
      justify-content: center; font-size: 1.4rem; flex-shrink: 0;
    }
    .stat-info { flex: 1; }
    .stat-value { display: block; font-size: 1.75rem; font-weight: 700; line-height: 1.2; }
    .stat-label { display: block; font-size: .8rem; color: var(--text-tertiary); margin-top: 4px; }
    .stat-trend { align-self: center; }
    .trend-up { color: var(--success); font-size: .8rem; font-weight: 600; }
    .trend-down { color: var(--error); font-size: .8rem; font-weight: 600; }
  `]
})
export class StatCardComponent {
  icon = input<string>('📊');
  value = input<string | number>(0);
  label = input<string>('');
  color = input<string>('var(--primary)');
  trend = input<number | null>(null);

  abs(n: number) { return Math.abs(n); }
}
