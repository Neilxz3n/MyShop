import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-content card" [style.max-width]="maxWidth()" (click)="$event.stopPropagation()">
        <div class="modal-header" *ngIf="title()">
          <h3>{{title()}}</h3>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>
        <div class="modal-body">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 1000;
      display: flex; align-items: center; justify-content: center; padding: 20px;
      animation: fadeIn .2s ease; backdrop-filter: blur(4px);
    }
    .modal-content {
      width: 100%; animation: scaleIn .2s ease; max-height: 90vh; display: flex;
      flex-direction: column; overflow: hidden;
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid var(--surface-border);
    }
    .modal-header h3 { font-size: 1.1rem; font-weight: 600; margin: 0; }
    .close-btn {
      background: none; border: none; font-size: 1.1rem; cursor: pointer;
      color: var(--text-tertiary); width: 32px; height: 32px; border-radius: var(--radius);
      display: flex; align-items: center; justify-content: center; transition: all var(--transition);
    }
    .close-btn:hover { background: var(--bg-secondary); color: var(--text-primary); }
    .modal-body { padding: 24px; overflow-y: auto; }
  `]
})
export class ModalComponent {
  title = input<string>('');
  maxWidth = input<string>('520px');
  close = output<void>();
}
