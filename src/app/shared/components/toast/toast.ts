import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts()" class="toast" [class]="'toast-' + toast.type"
           (click)="toastService.dismiss(toast.id)">
        <span class="toast-icon">{{getIcon(toast.type)}}</span>
        <span class="toast-msg">{{toast.message}}</span>
        <button class="toast-close" (click)="toastService.dismiss(toast.id); $event.stopPropagation()">✕</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; max-width: 400px; }
    .toast {
      display: flex; align-items: center; gap: 10px; padding: 14px 16px;
      border-radius: var(--radius-md); box-shadow: var(--shadow-lg);
      animation: slideInRight .3s ease; cursor: pointer;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    }
    .toast-success { background: var(--success); color: #fff; }
    .toast-error { background: var(--error); color: #fff; }
    .toast-warning { background: var(--warning); color: #fff; }
    .toast-info { background: var(--primary); color: #fff; }
    .toast-icon { font-size: 1.1rem; }
    .toast-msg { flex: 1; font-size: .875rem; font-weight: 500; }
    .toast-close { background: none; border: none; color: rgba(255,255,255,.7); cursor: pointer; font-size: .9rem; padding: 0; }
    .toast-close:hover { color: #fff; }
    @media (max-width: 480px) { .toast-container { right: 8px; left: 8px; max-width: none; } }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);

  getIcon(type: string): string {
    const icons: Record<string, string> = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    return icons[type] || 'ℹ';
  }
}
