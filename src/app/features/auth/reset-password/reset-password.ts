import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="reset-form animate-fade">
      <div class="form-header">
        <span class="icon">🔒</span>
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
      </div>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label class="form-label">New Password</label>
          <div class="pw-wrap">
            <input [type]="showPw() ? 'text' : 'password'" class="form-input" [(ngModel)]="password" name="password"
                   placeholder="Enter new password" [class.error]="submitted && !password" required />
            <button type="button" class="toggle" (click)="showPw.set(!showPw())">{{showPw() ? '🙈' : '👁️'}}</button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input type="password" class="form-input" [(ngModel)]="confirm" name="confirm"
                 placeholder="Confirm new password" [class.error]="submitted && password !== confirm" required />
          <div class="form-error" *ngIf="submitted && password !== confirm">Passwords do not match</div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg submit-btn">Reset Password</button>
      </form>
      <div class="form-footer"><a routerLink="/login">← Back to Login</a></div>
    </div>
  `,
  styles: [`
    .reset-form { width: 100%; max-width: 420px; text-align: center; }
    .form-header { margin-bottom: 28px; }
    .icon { font-size: 2.5rem; display: block; margin-bottom: 12px; }
    .form-header h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
    .form-header p { color: var(--text-secondary); font-size: .9rem; }
    .pw-wrap { position: relative; }
    .toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; }
    .form-group { text-align: left; }
    .submit-btn { width: 100%; margin-bottom: 20px; }
    .form-footer a { color: var(--primary); font-size: .9rem; }
  `]
})
export class ResetPasswordComponent {
  private router = inject(Router);
  private toast = inject(ToastService);
  password = '';
  confirm = '';
  showPw = signal(false);
  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (!this.password || this.password !== this.confirm) return;
    this.toast.success('Password reset successfully!');
    this.router.navigate(['/login']);
  }
}
