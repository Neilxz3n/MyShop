import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings animate-fade">
      <div class="page-header"><h1>Settings</h1><p>Configure your preferences.</p></div>
      <div class="settings-grid">
        <!-- Appearance -->
        <div class="card settings-card">
          <div class="sc-header"><h3>🎨 Appearance</h3></div>
          <div class="sc-body">
            <div class="setting-row">
              <div class="setting-info"><strong>Dark Mode</strong><span>Switch between light and dark themes</span></div>
              <label class="toggle-switch">
                <input type="checkbox" [checked]="theme.darkMode()" (change)="theme.toggle()" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="card settings-card">
          <div class="sc-header"><h3>🔔 Notification Preferences</h3></div>
          <div class="sc-body">
            <div class="setting-row" *ngFor="let pref of notifPrefs">
              <div class="setting-info"><strong>{{pref.label}}</strong><span>{{pref.desc}}</span></div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="pref.enabled" [name]="pref.key" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Password -->
        <div class="card settings-card">
          <div class="sc-header"><h3>🔒 Change Password</h3></div>
          <div class="sc-body">
            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input type="password" class="form-input" [(ngModel)]="currentPw" placeholder="Enter current password" />
            </div>
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input type="password" class="form-input" [(ngModel)]="newPw" placeholder="Enter new password" />
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <input type="password" class="form-input" [(ngModel)]="confirmPw" placeholder="Confirm new password" />
            </div>
            <button class="btn btn-primary" (click)="changePassword()">Update Password</button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="card settings-card danger">
          <div class="sc-header"><h3>⚠️ Danger Zone</h3></div>
          <div class="sc-body">
            <div class="setting-row">
              <div class="setting-info"><strong>Delete Account</strong><span>Permanently delete your account and all data</span></div>
              <button class="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: .9rem; }
    .settings-grid { display: flex; flex-direction: column; gap: 20px; max-width: 700px; }
    .sc-header { padding: 18px 24px; border-bottom: 1px solid var(--surface-border); }
    .sc-header h3 { font-size: .95rem; font-weight: 600; margin: 0; }
    .sc-body { padding: 20px 24px; }
    .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--surface-border); }
    .setting-row:last-child { border-bottom: none; }
    .setting-info strong { display: block; font-size: .85rem; margin-bottom: 2px; }
    .setting-info span { font-size: .78rem; color: var(--text-tertiary); }
    .toggle-switch { position: relative; width: 48px; height: 26px; display: inline-block; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute; inset: 0; background: var(--bg-tertiary); border-radius: 26px;
      cursor: pointer; transition: background .3s;
    }
    .slider::before {
      content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%;
      background: #fff; left: 3px; top: 3px; transition: transform .3s; box-shadow: var(--shadow-sm);
    }
    .toggle-switch input:checked + .slider { background: var(--primary); }
    .toggle-switch input:checked + .slider::before { transform: translateX(22px); }
    .danger { border-color: var(--error); }
    .danger .sc-header { background: var(--error-bg); }
  `]
})
export class SettingsComponent {
  theme = inject(ThemeService);
  private toast = inject(ToastService);
  currentPw = '';
  newPw = '';
  confirmPw = '';

  notifPrefs = [
    { key: 'match', label: 'Match Notifications', desc: 'Get notified when a potential match is found', enabled: true },
    { key: 'claim', label: 'Claim Updates', desc: 'Receive updates on your claim requests', enabled: true },
    { key: 'announce', label: 'Announcements', desc: 'Campus-wide announcements and updates', enabled: true },
    { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email', enabled: false },
  ];

  changePassword() {
    if (!this.currentPw || !this.newPw || this.newPw !== this.confirmPw) {
      this.toast.error('Please fill in all fields correctly.');
      return;
    }
    this.toast.success('Password updated successfully!');
    this.currentPw = '';
    this.newPw = '';
    this.confirmPw = '';
  }
}
