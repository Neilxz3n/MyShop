import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="email-templates animate-fade">
      <div class="page-header">
        <h1>Email Notification Previews</h1>
        <p>Preview email notification templates sent to users.</p>
      </div>
      <div class="template-tabs">
        <button *ngFor="let t of templates" class="btn btn-sm" [class.btn-primary]="active() === t.id"
                [class.btn-ghost]="active() !== t.id" (click)="active.set(t.id)">{{t.label}}</button>
      </div>
      <div class="email-preview card">
        <div class="email-container" *ngIf="active() === 'approved'" [innerHTML]="approvedHtml"></div>
        <div class="email-container" *ngIf="active() === 'rejected'" [innerHTML]="rejectedHtml"></div>
        <div class="email-container" *ngIf="active() === 'match'" [innerHTML]="matchHtml"></div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .template-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
    .email-preview { padding: 32px; overflow: hidden; }
    .email-container { max-width: 600px; margin: 0 auto; font-family: 'Inter', sans-serif; }
  `]
})
export class EmailTemplatesComponent {
  active = signal('approved');
  templates = [
    { id: 'approved', label: '✅ Claim Approved' },
    { id: 'rejected', label: '❌ Claim Rejected' },
    { id: 'match', label: '🔗 Match Found' },
  ];

  private emailWrap(title: string, color: string, icon: string, body: string) {
    return `<div style="background:#f8fafc;padding:24px;border-radius:12px">
      <div style="text-align:center;padding:20px 0"><span style="font-size:2rem">🎓</span>
        <h2 style="margin:8px 0 0;font-size:1.1rem;color:#0f172a">Campus Lost & Found</h2></div>
      <div style="background:#fff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,.1)">
        <div style="text-align:center;margin-bottom:24px">
          <div style="width:60px;height:60px;border-radius:50%;background:${color};margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem">${icon}</div>
          <h3 style="margin:0;font-size:1.3rem;color:#0f172a">${title}</h3></div>
        ${body}</div>
      <div style="text-align:center;padding:20px;font-size:.75rem;color:#94a3b8">
        <p>Campus Lost & Found Management System</p>
        <p>Student Affairs Building · campus.edu</p></div></div>`;
  }

  approvedHtml = this.emailWrap('Claim Approved!', '#ecfdf5', '✅',
    `<p style="color:#475569;line-height:1.7;font-size:.9rem">Dear <strong>Sarah Chen</strong>,</p>
    <p style="color:#475569;line-height:1.7;font-size:.9rem">Great news! Your claim for the following item has been <strong style="color:#10b981">approved</strong>.</p>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0">
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Item:</strong> Student ID Card</p>
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Claim ID:</strong> C001</p>
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Pickup Location:</strong> Student Affairs Office - Room 101</p>
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Office Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM</p>
    </div>
    <p style="color:#475569;line-height:1.7;font-size:.9rem">Please bring a valid ID when picking up your item.</p>
    <div style="text-align:center;margin-top:24px"><a href="#" style="background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;display:inline-block">View Claim Details</a></div>`
  );

  rejectedHtml = this.emailWrap('Claim Rejected', '#fef2f2', '❌',
    `<p style="color:#475569;line-height:1.7;font-size:.9rem">Dear <strong>David Kim</strong>,</p>
    <p style="color:#475569;line-height:1.7;font-size:.9rem">Unfortunately, your claim for the following item has been <strong style="color:#ef4444">rejected</strong>.</p>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0">
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Item:</strong> Calculator (TI-84)</p>
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Claim ID:</strong> C004</p>
      <p style="margin:4px 0;font-size:.85rem;color:#475569"><strong>Reason:</strong> Insufficient proof of ownership provided.</p>
    </div>
    <p style="color:#475569;line-height:1.7;font-size:.9rem">If you believe this was a mistake, you may submit a new claim with additional proof.</p>
    <div style="text-align:center;margin-top:24px"><a href="#" style="background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;display:inline-block">Submit New Claim</a></div>`
  );

  matchHtml = this.emailWrap('Possible Match Found!', '#ecfeff', '🔗',
    `<p style="color:#475569;line-height:1.7;font-size:.9rem">Dear <strong>Alex Rivera</strong>,</p>
    <p style="color:#475569;line-height:1.7;font-size:.9rem">We found a potential match for your lost item!</p>
    <div style="display:flex;gap:12px;margin:20px 0">
      <div style="flex:1;background:#fef2f2;border-radius:8px;padding:14px">
        <p style="font-size:.7rem;font-weight:700;color:#ef4444;margin:0 0 8px">YOUR LOST ITEM</p>
        <p style="font-size:.85rem;font-weight:600;margin:0 0 4px;color:#0f172a">iPhone 15 Pro</p>
        <p style="font-size:.75rem;color:#64748b;margin:0">Gymnasium - Locker Room</p></div>
      <div style="flex:1;background:#ecfdf5;border-radius:8px;padding:14px">
        <p style="font-size:.7rem;font-weight:700;color:#10b981;margin:0 0 8px">FOUND ITEM</p>
        <p style="font-size:.85rem;font-weight:600;margin:0 0 4px;color:#0f172a">Wireless Earbuds</p>
        <p style="font-size:.75rem;color:#64748b;margin:0">Library - 3rd Floor</p></div>
    </div>
    <div style="text-align:center;background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0">
      <p style="font-size:1.5rem;font-weight:700;color:#2563eb;margin:0">68%</p>
      <p style="font-size:.75rem;color:#64748b;margin:4px 0 0">Match Confidence</p></div>
    <div style="text-align:center;margin-top:24px"><a href="#" style="background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;display:inline-block">Review Match</a></div>`
  );
}
