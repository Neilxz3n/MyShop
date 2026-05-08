import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-form animate-fade">
      <div class="form-header">
        <span class="mobile-logo hide-desktop">🎓</span>
        <h2>Welcome back</h2>
        <p>Sign in to your campus account</p>
      </div>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" [(ngModel)]="email" name="email" placeholder="you@campus.edu"
                 [class.error]="submitted && !email" required />
          <div class="form-error" *ngIf="submitted && !email">Email is required</div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="password-wrapper">
            <input [type]="showPassword() ? 'text' : 'password'" class="form-input" [(ngModel)]="password"
                   name="password" placeholder="Enter your password" [class.error]="submitted && !password" required />
            <button type="button" class="toggle-pass" (click)="showPassword.set(!showPassword())">
              {{showPassword() ? '🙈' : '👁️'}}
            </button>
          </div>
          <div class="form-error" *ngIf="submitted && !password">Password is required</div>
        </div>
        <div class="form-row">
          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="remember" name="remember" />
            <span>Remember me</span>
          </label>
          <a routerLink="/forgot-password" class="forgot-link">Forgot password?</a>
        </div>
        <div class="form-error" *ngIf="loginError">{{loginError}}</div>
        <button type="submit" class="btn btn-primary btn-lg submit-btn">Sign In</button>
      </form>
      <div class="form-footer">
        <p>Don't have an account? <a routerLink="/register">Create one</a></p>
      </div>
      <div class="demo-accounts">
        <p class="demo-title">Demo Accounts (click to fill):</p>
        <button *ngFor="let acc of demoAccounts" class="demo-btn" (click)="fillDemo(acc)">
          {{acc.icon}} {{acc.label}}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-form { width: 100%; max-width: 420px; }
    .form-header { margin-bottom: 32px; }
    .mobile-logo { font-size: 2rem; display: block; margin-bottom: 12px; }
    .form-header h2 { font-size: 1.75rem; font-weight: 700; margin-bottom: 8px; }
    .form-header p { color: var(--text-secondary); font-size: .95rem; }
    .password-wrapper { position: relative; }
    .toggle-pass {
      position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; font-size: 1rem;
    }
    .form-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: .85rem; color: var(--text-secondary); cursor: pointer; }
    .checkbox-label input { accent-color: var(--primary); }
    .forgot-link { font-size: .85rem; color: var(--primary); }
    .submit-btn { width: 100%; margin-bottom: 24px; }
    .form-footer { text-align: center; }
    .form-footer p { font-size: .9rem; color: var(--text-secondary); }
    .form-footer a { color: var(--primary); font-weight: 600; }
    .demo-accounts { margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--surface-border); }
    .demo-title { font-size: .8rem; color: var(--text-tertiary); margin-bottom: 10px; }
    .demo-btn {
      display: inline-block; padding: 6px 12px; margin: 4px; font-size: .8rem;
      background: var(--bg-secondary); border: 1px solid var(--surface-border);
      border-radius: var(--radius-full); cursor: pointer; color: var(--text-secondary);
      transition: all var(--transition);
    }
    .demo-btn:hover { border-color: var(--primary); color: var(--primary); }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  email = '';
  password = '';
  remember = false;
  showPassword = signal(false);
  submitted = false;
  loginError = '';

  demoAccounts = [
    { icon: '🎓', label: 'Student', email: 'alex.rivera@campus.edu' },
    { icon: '👨‍🏫', label: 'Faculty', email: 'j.wilson@campus.edu' },
    { icon: '🛡️', label: 'Admin', email: 'maria.santos@campus.edu' },
  ];

  fillDemo(acc: { email: string }) {
    this.email = acc.email;
    this.password = 'demo123';
  }

  onSubmit() {
    this.submitted = true;
    this.loginError = '';
    if (!this.email || !this.password) return;
    const success = this.auth.login(this.email, this.password, this.remember);
    if (success) {
      this.toast.success('Welcome back, ' + this.auth.currentUser()!.name + '!');
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = 'Invalid email or password. Try a demo account.';
    }
  }
}
