import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="badge" [ngClass]="badgeClass()">{{status() | titlecase}}</span>`,
  styles: [`:host { display: inline-flex; }`]
})
export class StatusBadgeComponent {
  status = input<string>('');

  badgeClass(): string {
    const map: Record<string, string> = {
      pending: 'badge-warning', matched: 'badge-info', claimed: 'badge-success',
      returned: 'badge-success', approved: 'badge-success', rejected: 'badge-error',
      confirmed: 'badge-success', dismissed: 'badge-error',
    };
    return map[this.status()] || 'badge-primary';
  }
}
