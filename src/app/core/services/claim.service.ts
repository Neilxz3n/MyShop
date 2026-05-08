import { Injectable, signal } from '@angular/core';
import { Claim } from '../models';
import { MOCK_CLAIMS } from '../mock-data/claims.data';

@Injectable({ providedIn: 'root' })
export class ClaimService {
  claims = signal<Claim[]>([...MOCK_CLAIMS]);

  submitClaim(claim: Partial<Claim>): Claim {
    const newClaim: Claim = {
      id: 'C' + String(this.claims().length + 1).padStart(3, '0'),
      itemId: claim.itemId || '',
      itemName: claim.itemName || '',
      claimantId: claim.claimantId || '',
      claimantName: claim.claimantName || '',
      claimantEmail: claim.claimantEmail || '',
      description: claim.description || '',
      proofDescription: claim.proofDescription || '',
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
    };
    this.claims.update(c => [newClaim, ...c]);
    return newClaim;
  }

  approveClaim(id: string, adminNotes: string) {
    this.claims.update(c => c.map(cl =>
      cl.id === id ? { ...cl, status: 'approved' as const, adminNotes, reviewedDate: new Date().toISOString().split('T')[0], reviewedBy: 'Admin' } : cl
    ));
  }

  rejectClaim(id: string, adminNotes: string) {
    this.claims.update(c => c.map(cl =>
      cl.id === id ? { ...cl, status: 'rejected' as const, adminNotes, reviewedDate: new Date().toISOString().split('T')[0], reviewedBy: 'Admin' } : cl
    ));
  }

  getClaimsByUser(userId: string): Claim[] {
    return this.claims().filter(c => c.claimantId === userId);
  }

  getClaimsByItem(itemId: string): Claim[] {
    return this.claims().filter(c => c.itemId === itemId);
  }
}
