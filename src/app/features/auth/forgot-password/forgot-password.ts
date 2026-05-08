import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="forgot-form animate-fade">
      <div class="form-header">
        <span class="icon">🔑</span>
        <h2>Forgot Password?</h2>
        <p>Enter your email and we'll send you a reset link.</p>
      </div>
      <form (ngSubmit)="onSubmit()" *ngIf="!sent()">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" [(ngModel)]="email" name="email" placeholder="you@campus.edu"
                 [class.error]="submitted && !email" required />
          <div class="form-error" *ngIf="submitted && !email">Email is required</div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg submit-btn">Send Reset Link</button>
      </form>
      <div class="success-msg" *ngIf="sent()">
        <span class="success-icon">✉️</span>
        <h3>Check your email</h3>
        <p>We've sent a password reset link to <strong>{{email}}</strong></p>
        <a routerLink="/login" class="btn btn-secondary">Back to Login</a>
      </div>
      <div class="form-footer" *ngIf="!sent()">
        <a routerLink="/login">← Back to Login</a>
      </div>
    </div>
  `,
  styles: [`
    .forgot-form { width: 100%; max-width: 420px; text-align: center; }
    .form-header { margin-bottom: 28px; }
    .icon { font-size: 2.5rem; display: block; margin-bottom: 12px; }
    .form-header h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
    .form-header p { color: var(--text-secondary); font-size: .9rem; }
    .submit-btn { width: 100%; margin-bottom: 20px; }
    .form-footer a { color: var(--primary); font-size: .9rem; }
    .success-msg { padding: 20px 0; }
    .success-icon { font-size: 3rem; display: block; margin-bottom: 16px; }
    .success-msg h3 { font-size: 1.2rem; margin-bottom: 8px; }
    .success-msg p { color: var(--text-secondary); margin-bottom: 24px; font-size: .9rem; }
    .form-group { text-align: left; }
  `]
})
export class ForgotPasswordComponent {
  private toast = inject(ToastService);
  email = '';
  submitted = false;
  sent = signal(false);

  onSubmit() {
    this.submitted = true;
    if (!this.email) return;
    this.sent.set(true);
    this.toast.success('Password reset link sent!');
  }
}
