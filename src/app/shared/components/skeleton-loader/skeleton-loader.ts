import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-wrapper">
      <div *ngFor="let _ of rows()" class="skeleton-row">
        <div class="skeleton-line" [style.width]="randomWidth()" [style.height]="height()"></div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-wrapper { display: flex; flex-direction: column; gap: 12px; }
    .skeleton-line {
      background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
      background-size: 200px 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius);
    }
  `]
})
export class SkeletonLoaderComponent {
  count = input(3);
  height = input('16px');

  rows() { return Array.from({ length: this.count() }); }
  randomWidth(): string {
    const widths = ['100%', '85%', '70%', '90%', '60%'];
    return widths[Math.floor(Math.random() * widths.length)];
  }
}
