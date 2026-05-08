import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../core/services/item.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SearchBarComponent, StatusBadgeComponent, EmptyStateComponent],
  template: `
    <div class="lost-items animate-fade">
      <div class="page-header">
        <div>
          <h1>Lost Items</h1>
          <p>Browse and search through reported lost items on campus.</p>
        </div>
        <a routerLink="/lost-items/report" class="btn btn-primary">+ Report Lost Item</a>
      </div>

      <!-- Filters -->
      <div class="filters card">
        <app-search-bar placeholder="Search lost items..." (search)="searchQuery.set($event)" />
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
          <select class="form-input filter-select" [(ngModel)]="campusFilter" (ngModelChange)="campusFilter = $event">
            <option value="">All Campuses</option>
            <option *ngFor="let c of itemService.campuses" [value]="c">{{c}}</option>
          </select>
          <button class="btn btn-ghost btn-sm" (click)="clearFilters()">Clear</button>
        </div>
      </div>

      <!-- View Toggle -->
      <div class="view-toggle">
        <span class="results-count">{{filteredItems().length}} items found</span>
        <div class="toggle-btns">
          <button class="btn btn-sm" [class.btn-primary]="viewMode() === 'cards'" [class.btn-ghost]="viewMode() !== 'cards'" (click)="viewMode.set('cards')">▦ Cards</button>
          <button class="btn btn-sm" [class.btn-primary]="viewMode() === 'table'" [class.btn-ghost]="viewMode() !== 'table'" (click)="viewMode.set('table')">☰ Table</button>
        </div>
      </div>

      <!-- Cards View -->
      <div class="items-grid" *ngIf="viewMode() === 'cards' && filteredItems().length > 0">
        <div *ngFor="let item of filteredItems()" class="item-card card">
          <div class="item-img" *ngIf="item.image" [style.background-image]="'url(' + item.image + ')'"></div>
          <div class="item-img placeholder" *ngIf="!item.image"><span>🔍</span></div>
          <div class="item-body">
            <div class="item-top">
              <app-status-badge [status]="item.status" />
              <span class="item-date">{{item.date}}</span>
            </div>
            <h3>{{item.name}}</h3>
            <p class="item-desc">{{item.description}}</p>
            <div class="item-meta">
              <span>📍 {{item.location}}</span>
              <span>🏷️ {{item.category}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div class="table-wrapper card" *ngIf="viewMode() === 'table' && filteredItems().length > 0">
        <table>
          <thead>
            <tr><th>Item Name</th><th>Category</th><th>Location</th><th>Date Lost</th><th>Campus</th><th>Status</th><th>Contact</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of filteredItems()">
              <td><strong>{{item.name}}</strong></td>
              <td>{{item.category}}</td>
              <td>{{item.location}}</td>
              <td>{{item.date}}</td>
              <td>{{item.campus}}</td>
              <td><app-status-badge [status]="item.status" /></td>
              <td>{{item.contactName}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <app-empty-state *ngIf="filteredItems().length === 0" icon="🔍" title="No lost items found" message="Try adjusting your filters or report a new lost item." />
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .filters { padding: 20px; margin-bottom: 16px; }
    .filter-row { display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
    .filter-select { max-width: 200px; }
    .view-toggle { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .results-count { font-size: .85rem; color: var(--text-secondary); }
    .toggle-btns { display: flex; gap: 4px; }
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
    .item-meta { display: flex; gap: 16px; font-size: .78rem; color: var(--text-tertiary); }
    @media (max-width: 600px) { .filter-select { max-width: none; flex: 1; min-width: 140px; } }
  `]
})
export class LostItemsComponent {
  itemService = inject(ItemService);
  searchQuery = signal('');
  categoryFilter = '';
  statusFilter = '';
  campusFilter = '';
  viewMode = signal<'cards' | 'table'>('cards');

  filteredItems = computed(() => {
    let items = this.itemService.lostItems();
    const q = this.searchQuery().toLowerCase();
    if (q) items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.location.toLowerCase().includes(q));
    if (this.categoryFilter) items = items.filter(i => i.category === this.categoryFilter);
    if (this.statusFilter) items = items.filter(i => i.status === this.statusFilter);
    if (this.campusFilter) items = items.filter(i => i.campus === this.campusFilter);
    return items;
  });

  clearFilters() { this.searchQuery.set(''); this.categoryFilter = ''; this.statusFilter = ''; this.campusFilter = ''; }
}
