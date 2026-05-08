import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile animate-fade">
      <div class="page-header"><h1>Profile</h1><p>Manage your personal information.</p></div>
      <div class="profile-grid" *ngIf="auth.currentUser() as user">
        <div class="card profile-card">
          <div class="profile-banner"></div>
          <div class="profile-info">
            <div class="avatar-lg">{{user.name[0]}}</div>
            <h2>{{user.name}}</h2>
            <span class="role badge badge-primary">{{user.role | titlecase}}</span>
            <p class="email">{{user.email}}</p>
          </div>
          <div class="profile-stats">
            <div class="ps"><strong>3</strong><span>Reports</span></div>
            <div class="ps"><strong>2</strong><span>Claims</span></div>
            <div class="ps"><strong>1</strong><span>Recovered</span></div>
          </div>
          <div class="profile-details">
            <div class="pd-row"><span class="pd-label">Campus ID</span><span>{{user.campusId || 'Not set'}}</span></div>
            <div class="pd-row"><span class="pd-label">Department</span><span>{{user.department || 'Not set'}}</span></div>
            <div class="pd-row"><span class="pd-label">Phone</span><span>{{user.phone || 'Not set'}}</span></div>
            <div class="pd-row"><span class="pd-label">Joined</span><span>{{user.joinedDate}}</span></div>
          </div>
        </div>

        <div class="card edit-card">
          <div class="ec-header"><h3>Edit Profile</h3></div>
          <form class="ec-body" (ngSubmit)="saveProfile()">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" [(ngModel)]="editName" name="name" />
            </div>
            <div class="form-group">
              <label class="form-label">Department</label>
              <input type="text" class="form-input" [(ngModel)]="editDept" name="dept" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" [(ngModel)]="editPhone" name="phone" />
            </div>
            <div class="form-group">
              <label class="form-label">Campus ID</label>
              <input type="text" class="form-input" [(ngModel)]="editCampusId" name="campusId" />
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .profile-grid { display: grid; grid-template-columns: 360px 1fr; gap: 24px; }
    .profile-card { overflow: hidden; }
    .profile-banner { height: 100px; background: linear-gradient(135deg, var(--primary), var(--secondary)); }
    .profile-info { text-align: center; padding: 0 24px; margin-top: -40px; }
    .avatar-lg {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 12px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #fff; font-size: 2rem; font-weight: 700; display: flex; align-items: center;
      justify-content: center; border: 4px solid var(--surface);
    }
    .profile-info h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: 6px; }
    .email { font-size: .85rem; color: var(--text-secondary); margin-top: 8px; }
    .profile-stats { display: flex; justify-content: center; gap: 32px; padding: 20px; border-top: 1px solid var(--surface-border); margin-top: 20px; }
    .ps { text-align: center; }
    .ps strong { display: block; font-size: 1.2rem; }
    .ps span { font-size: .75rem; color: var(--text-tertiary); }
    .profile-details { padding: 16px 24px; }
    .pd-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--surface-border); font-size: .85rem; }
    .pd-row:last-child { border-bottom: none; }
    .pd-label { color: var(--text-tertiary); }
    .edit-card { overflow: hidden; }
    .ec-header { padding: 20px 24px; border-bottom: 1px solid var(--surface-border); }
    .ec-header h3 { font-size: 1rem; font-weight: 600; margin: 0; }
    .ec-body { padding: 24px; }
    @media (max-width: 768px) { .profile-grid { grid-template-columns: 1fr; } }
  `]
})
export class ProfileComponent {
  auth = inject(AuthService);
  private toast = inject(ToastService);

  editName = '';
  editDept = '';
  editPhone = '';
  editCampusId = '';

  ngOnInit() {
    const user = this.auth.currentUser();
    if (user) {
      this.editName = user.name;
      this.editDept = user.department || '';
      this.editPhone = user.phone || '';
      this.editCampusId = user.campusId || '';
    }
  }

  saveProfile() {
    this.auth.updateProfile({ name: this.editName, department: this.editDept, phone: this.editPhone, campusId: this.editCampusId });
    this.toast.success('Profile updated successfully!');
  }
}
