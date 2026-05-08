import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <span class="empty-icon">{{icon()}}</span>
      <h3>{{title()}}</h3>
      <p>{{message()}}</p>
      <ng-content />
    </div>
  `,
  styles: [`
    .empty-state { text-align: center; padding: 60px 20px; }
    .empty-icon { font-size: 3rem; display: block; margin-bottom: 16px; }
    h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); }
    p { font-size: .9rem; color: var(--text-tertiary); max-width: 400px; margin: 0 auto 20px; }
  `]
})
export class EmptyStateComponent {
  icon = input('📭');
  title = input('Nothing here yet');
  message = input('');
}
