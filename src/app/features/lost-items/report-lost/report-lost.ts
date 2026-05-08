import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from '../../../core/services/item.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-report-lost',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="report-page animate-fade">
      <div class="page-header">
        <a routerLink="/lost-items" class="back-link">← Back to Lost Items</a>
        <h1>Report Lost Item</h1>
        <p>Fill in the details below to report your lost item.</p>
      </div>
      <form class="report-form card" (ngSubmit)="onSubmit()">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Item Name *</label>
            <input type="text" class="form-input" [(ngModel)]="item.name" name="name" placeholder="e.g. Blue Backpack" [class.error]="submitted && !item.name" required />
            <div class="form-error" *ngIf="submitted && !item.name">Required</div>
          </div>
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select class="form-input" [(ngModel)]="item.category" name="category">
              <option *ngFor="let c of itemService.categories" [value]="c">{{c}}</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Description *</label>
            <textarea class="form-input" [(ngModel)]="item.description" name="description" placeholder="Provide detailed description..." [class.error]="submitted && !item.description" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Last Seen Location *</label>
            <input type="text" class="form-input" [(ngModel)]="item.location" name="location" placeholder="e.g. Library 2nd Floor" [class.error]="submitted && !item.location" required />
          </div>
          <div class="form-group">
            <label class="form-label">Date Lost *</label>
            <input type="date" class="form-input" [(ngModel)]="item.date" name="date" required />
          </div>
          <div class="form-group">
            <label class="form-label">Department</label>
            <select class="form-input" [(ngModel)]="item.department" name="department">
              <option *ngFor="let d of itemService.departments" [value]="d">{{d}}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Campus</label>
            <select class="form-input" [(ngModel)]="item.campus" name="campus">
              <option *ngFor="let c of itemService.campuses" [value]="c">{{c}}</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Image URL (optional)</label>
            <input type="text" class="form-input" [(ngModel)]="item.image" name="image" placeholder="https://..." />
            <div class="image-preview" *ngIf="item.image">
              <img [src]="item.image" alt="preview" (error)="item.image = ''" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Contact Name *</label>
            <input type="text" class="form-input" [(ngModel)]="item.contactName" name="contactName" required />
          </div>
          <div class="form-group">
            <label class="form-label">Contact Email *</label>
            <input type="email" class="form-input" [(ngModel)]="item.contactEmail" name="contactEmail" required />
          </div>
          <div class="form-group">
            <label class="form-label">Contact Phone</label>
            <input type="tel" class="form-input" [(ngModel)]="item.contactPhone" name="contactPhone" />
          </div>
        </div>
        <div class="form-actions">
          <a routerLink="/lost-items" class="btn btn-ghost">Cancel</a>
          <button type="submit" class="btn btn-primary">Submit Report</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .back-link { font-size: .85rem; color: var(--primary); margin-bottom: 12px; display: inline-block; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .report-form { padding: 28px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
    .full-width { grid-column: 1 / -1; }
    .image-preview { margin-top: 10px; }
    .image-preview img { max-height: 200px; border-radius: var(--radius); border: 1px solid var(--surface-border); }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--surface-border); }
    @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
  `]
})
export class ReportLostComponent {
  itemService = inject(ItemService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  submitted = false;

  item: any = {
    name: '', category: 'Electronics', description: '', location: '', date: new Date().toISOString().split('T')[0],
    department: 'Computer Science', campus: 'Main Campus', image: '', contactName: '', contactEmail: '', contactPhone: '',
  };

  ngOnInit() {
    const user = this.auth.currentUser();
    if (user) { this.item.contactName = user.name; this.item.contactEmail = user.email; this.item.reportedBy = user.id; }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.item.name || !this.item.description || !this.item.location) return;
    this.itemService.addLostItem(this.item);
    this.toast.success('Lost item reported successfully!');
    this.router.navigate(['/lost-items']);
  }
}
