import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <div class="chart-header" *ngIf="title()">
        <h4>{{title()}}</h4>
      </div>
      <!-- Bar Chart -->
      <div class="bar-chart" *ngIf="type() === 'bar'">
        <div *ngFor="let item of data()" class="bar-row">
          <span class="bar-label">{{item.label}}</span>
          <div class="bar-track">
            <div class="bar-fill" [style.width.%]="getPercent(item.value)" [style.background]="item.color || 'var(--primary)'"></div>
          </div>
          <span class="bar-value">{{item.value}}</span>
        </div>
      </div>
      <!-- Donut Chart -->
      <div class="donut-chart" *ngIf="type() === 'donut'">
        <div class="donut" [style.background]="getConicGradient()">
          <div class="donut-hole">
            <span class="donut-total">{{getTotal()}}</span>
            <span class="donut-label">Total</span>
          </div>
        </div>
        <div class="donut-legend">
          <div *ngFor="let item of data()" class="legend-item">
            <span class="legend-dot" [style.background]="item.color"></span>
            <span class="legend-text">{{item.label}}</span>
            <span class="legend-value">{{item.value}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-wrapper { padding: 4px 0; }
    .chart-header { margin-bottom: 16px; }
    .chart-header h4 { font-size: .95rem; font-weight: 600; margin: 0; }
    .bar-chart { display: flex; flex-direction: column; gap: 12px; }
    .bar-row { display: flex; align-items: center; gap: 12px; }
    .bar-label { font-size: .8rem; color: var(--text-secondary); width: 80px; text-align: right; flex-shrink: 0; }
    .bar-track { flex: 1; height: 24px; background: var(--bg-secondary); border-radius: var(--radius-full); overflow: hidden; }
    .bar-fill { height: 100%; border-radius: var(--radius-full); transition: width .8s ease; min-width: 4px; }
    .bar-value { font-size: .8rem; font-weight: 600; width: 40px; }
    .donut-chart { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; justify-content: center; }
    .donut {
      width: 160px; height: 160px; border-radius: 50%; position: relative;
      display: flex; align-items: center; justify-content: center;
    }
    .donut-hole {
      width: 100px; height: 100px; border-radius: 50%; background: var(--surface);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .donut-total { font-size: 1.5rem; font-weight: 700; }
    .donut-label { font-size: .7rem; color: var(--text-tertiary); }
    .donut-legend { display: flex; flex-direction: column; gap: 10px; }
    .legend-item { display: flex; align-items: center; gap: 8px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .legend-text { font-size: .8rem; color: var(--text-secondary); flex: 1; }
    .legend-value { font-size: .8rem; font-weight: 600; }
  `]
})
export class ChartComponent {
  title = input<string>('');
  type = input<'bar' | 'donut'>('bar');
  data = input<{ label: string; value: number; color?: string }[]>([]);

  getTotal(): number { return this.data().reduce((s, d) => s + d.value, 0); }

  getPercent(value: number): number {
    const max = Math.max(...this.data().map(d => d.value));
    return max > 0 ? (value / max) * 100 : 0;
  }

  getConicGradient(): string {
    const total = this.getTotal();
    if (total === 0) return 'var(--bg-secondary)';
    let cumulative = 0;
    const stops = this.data().map(d => {
      const start = cumulative;
      cumulative += (d.value / total) * 360;
      return `${d.color || 'var(--primary)'} ${start}deg ${cumulative}deg`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }
}
