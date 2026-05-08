import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input type="text" [placeholder]="placeholder()" [ngModel]="value()" (ngModelChange)="value.set($event); search.emit($event)" class="search-input" />
      <button *ngIf="value()" class="clear-btn" (click)="value.set(''); search.emit('')">✕</button>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex; align-items: center; gap: 8px; background: var(--surface);
      border: 1px solid var(--surface-border); border-radius: var(--radius-full);
      padding: 10px 16px; transition: all var(--transition);
    }
    .search-bar:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-100); }
    .search-icon { font-size: .9rem; flex-shrink: 0; }
    .search-input { border: none; background: transparent; outline: none; font-size: .9rem; color: var(--text-primary); width: 100%; }
    .clear-btn { background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: .8rem; }
  `]
})
export class SearchBarComponent {
  placeholder = input('Search...');
  value = model('');
  search = output<string>();
}
