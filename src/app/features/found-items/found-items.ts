import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../core/services/item.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-found-items',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SearchBarComponent, StatusBadgeComponent, EmptyStateComponent],
  template: `
    <div class="found-items animate-fade">
      <div class="page-header">
        <div>
          <h1>Found Items</h1>
          <p>Browse items that have been found on campus.</p>
        </div>
        <a routerLink="/found-items/report" class="btn btn-success">+ Report Found Item</a>
      </div>

      <div class="filters card">
        <app-search-bar placeholder="Search found items..." (search)="searchQuery.set($event)" />
        <div class="filter-row">
          <select class="form-input filter-select" [(ngModel)]="categoryFilter" (ngModelChange)="categoryFilter = $event">
            <option value="">All Categories</option>
            <option *ngFor="let c of itemService.categories" [value]="c">{{c}}</option>
          </select>
          <select class="form-input filter-select" [(ngModel)]="statusFilter" (ngModelChange)="statusFilter = $event">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="matched">Matched</option>
            <option value="claimed">Claimed</option>
          </select>
          <button class="btn btn-ghost btn-sm" (click)="clearFilters()">Clear</button>
        </div>
      </div>

      <div class="results-info">
        <span>{{filteredItems().length}} items found</span>
      </div>

      <div class="items-grid" *ngIf="filteredItems().length > 0">
        <div *ngFor="let item of filteredItems()" class="item-card card">
          <div class="item-img" *ngIf="item.image" [style.background-image]="'url(' + item.image + ')'"></div>
          <div class="item-img placeholder" *ngIf="!item.image"><span>📦</span></div>
          <div class="item-body">
            <div class="item-top">
              <app-status-badge [status]="item.status" />
              <span class="item-date">Found: {{item.date}}</span>
            </div>
            <h3>{{item.name}}</h3>
            <p class="item-desc">{{item.description}}</p>
            <div class="item-meta">
              <span>📍 {{item.location}}</span>
              <span>🏷️ {{item.category}}</span>
            </div>
            <div class="pickup" *ngIf="item.pickupLocation">
              <span class="pickup-label">📌 Pickup:</span> {{item.pickupLocation}}
            </div>
          </div>
        </div>
      </div>

      <app-empty-state *ngIf="filteredItems().length === 0" icon="📦" title="No found items" message="Try adjusting your filters." />
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .filters { padding: 20px; margin-bottom: 16px; }
    .filter-row { display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
    .filter-select { max-width: 200px; }
    .results-info { margin-bottom: 16px; font-size: .85rem; color: var(--text-secondary); }
    .items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .item-card { overflow: hidden; transition: all var(--transition); }
    .item-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
    .item-img { height: 180px; background-size: cover; background-position: center; }
    .item-img.placeholder { background: var(--bg-secondary); display: flex; align-items: center; justify-content: center; }
    .item-img.placeholder span { font-size: 3rem; opacity: .3; }
    .item-body { padding: 16px; }
    .item-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .item-date { font-size: .75rem; color: var(--text-tertiary); }
    .item-body h3 { font-size: 1rem; font-weight: 600; margin-bottom: 6px; }
    .item-desc { font-size: .82rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    .item-meta { display: flex; gap: 16px; font-size: .78rem; color: var(--text-tertiary); margin-bottom: 8px; }
    .pickup { font-size: .78rem; color: var(--success); padding: 8px; background: var(--success-bg); border-radius: var(--radius); }
    .pickup-label { font-weight: 600; }
  `]
})
export class FoundItemsComponent {
  itemService = inject(ItemService);
  searchQuery = signal('');
  categoryFilter = '';
  statusFilter = '';

  filteredItems = computed(() => {
    let items = this.itemService.foundItems();
    const q = this.searchQuery().toLowerCase();
    if (q) items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    if (this.categoryFilter) items = items.filter(i => i.category === this.categoryFilter);
    if (this.statusFilter) items = items.filter(i => i.status === this.statusFilter);
    return items;
  });

  clearFilters() { this.searchQuery.set(''); this.categoryFilter = ''; this.statusFilter = ''; }
}
