import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../core/services/claim.service';
import { ItemService } from '../../core/services/item.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { ModalComponent } from '../../shared/components/modal/modal';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent, ModalComponent, EmptyStateComponent],
  template: `
    <div class="claims animate-fade">
      <div class="page-header">
        <div>
          <h1>{{isAdmin() ? 'All Claims' : 'My Claims'}}</h1>
          <p>{{isAdmin() ? 'Review and manage all claim requests.' : 'Track your claim requests and their status.'}}</p>
        </div>
        <button class="btn btn-primary" *ngIf="!isAdmin()" (click)="showClaimModal.set(true)">+ New Claim</button>
      </div>

      <div class="claims-list" *ngIf="visibleClaims().length > 0">
        <div *ngFor="let claim of visibleClaims()" class="claim-card card">
          <div class="claim-header">
            <div>
              <h3>{{claim.itemName}}</h3>
              <span class="claim-id">Claim #{{claim.id}}</span>
            </div>
            <app-status-badge [status]="claim.status" />
          </div>
          <div class="claim-body">
            <div class="claim-detail"><strong>Claimant:</strong> {{claim.claimantName}}</div>
            <div class="claim-detail"><strong>Description:</strong> {{claim.description}}</div>
            <div class="claim-detail"><strong>Proof:</strong> {{claim.proofDescription}}</div>
            <div class="claim-detail"><strong>Submitted:</strong> {{claim.submittedDate}}</div>
            <div class="claim-detail" *ngIf="claim.reviewedDate"><strong>Reviewed:</strong> {{claim.reviewedDate}} by {{claim.reviewedBy}}</div>
            <div class="admin-notes" *ngIf="claim.adminNotes">
              <strong>Admin Notes:</strong> {{claim.adminNotes}}
            </div>
          </div>
          <div class="claim-actions" *ngIf="auth.currentUser()?.role === 'admin' && claim.status === 'pending'">
            <button class="btn btn-success btn-sm" (click)="approveClaim(claim.id)">✓ Approve</button>
            <button class="btn btn-danger btn-sm" (click)="rejectClaim(claim.id)">✕ Reject</button>
          </div>
        </div>
      </div>

      <app-empty-state *ngIf="visibleClaims().length === 0" icon="📋"
        [title]="isAdmin() ? 'No claims yet' : 'No claims yet'"
        [message]="isAdmin() ? 'No claims have been submitted by users.' : 'Browse Found Items and submit a claim for items that belong to you.'" />

      <!-- New Claim Modal -->
      <app-modal *ngIf="showClaimModal()" title="Submit a Claim" (close)="showClaimModal.set(false)" maxWidth="560px">
        <form (ngSubmit)="submitClaim()">
          <div class="form-group">
            <label class="form-label">Select Found Item *</label>
            <select class="form-input" [(ngModel)]="newClaim.itemId" name="itemId" (ngModelChange)="onItemSelect($event)">
              <option value="">Choose an item...</option>
              <option *ngFor="let item of itemService.foundItems()" [value]="item.id">{{item.name}} - {{item.location}}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Why is this yours? *</label>
            <textarea class="form-input" [(ngModel)]="newClaim.description" name="description" placeholder="Explain why you believe this item belongs to you..." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Proof of Ownership *</label>
            <textarea class="form-input" [(ngModel)]="newClaim.proofDescription" name="proof" placeholder="Describe identifying details only you would know..." required></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" (click)="showClaimModal.set(false)">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Claim</button>
          </div>
        </form>
      </app-modal>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .claims-list { display: flex; flex-direction: column; gap: 16px; }
    .claim-card { padding: 20px; }
    .claim-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .claim-header h3 { font-size: 1rem; font-weight: 600; margin-bottom: 2px; }
    .claim-id { font-size: .75rem; color: var(--text-tertiary); }
    .claim-detail { font-size: .85rem; color: var(--text-secondary); margin-bottom: 6px; }
    .claim-detail strong { color: var(--text-primary); }
    .admin-notes { margin-top: 10px; padding: 12px; background: var(--bg-secondary); border-radius: var(--radius); font-size: .85rem; }
    .claim-actions { display: flex; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--surface-border); }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
  `]
})
export class ClaimsComponent {
  claimService = inject(ClaimService);
  itemService = inject(ItemService);
  auth = inject(AuthService);
  private toast = inject(ToastService);

  isAdmin = computed(() => this.auth.currentUser()?.role === 'admin');

  visibleClaims = computed(() => {
    if (this.isAdmin()) return this.claimService.claims();
    const uid = this.auth.currentUser()?.id;
    return this.claimService.claims().filter(c => c.claimantId === uid);
  });

  showClaimModal = signal(false);
  newClaim: any = { itemId: '', itemName: '', description: '', proofDescription: '' };

  onItemSelect(itemId: string) {
    const item = this.itemService.getItemById(itemId);
    if (item) this.newClaim.itemName = item.name;
  }

  submitClaim() {
    if (!this.newClaim.itemId || !this.newClaim.description || !this.newClaim.proofDescription) return;
    const user = this.auth.currentUser();
    this.claimService.submitClaim({
      ...this.newClaim,
      claimantId: user?.id,
      claimantName: user?.name,
      claimantEmail: user?.email,
    });
    this.toast.success('Claim submitted successfully!');
    this.showClaimModal.set(false);
    this.newClaim = { itemId: '', itemName: '', description: '', proofDescription: '' };
  }

  approveClaim(id: string) {
    this.claimService.approveClaim(id, 'Identity verified. Item can be picked up.');
    this.toast.success('Claim approved!');
  }

  rejectClaim(id: string) {
    this.claimService.rejectClaim(id, 'Insufficient proof of ownership provided.');
    this.toast.error('Claim rejected.');
  }
}
