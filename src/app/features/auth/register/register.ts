import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="register-form animate-fade">
      <div class="form-header">
        <span class="mobile-logo hide-desktop">🎓</span>
        <h2>Create Account</h2>
        <p>Join the campus Lost & Found community</p>
      </div>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" [(ngModel)]="name" name="name" placeholder="Enter your full name"
                 [class.error]="submitted && !name" required />
          <div class="form-error" *ngIf="submitted && !name">Name is required</div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" [(ngModel)]="email" name="email" placeholder="you@campus.edu"
                 [class.error]="submitted && !email" required />
          <div class="form-error" *ngIf="submitted && !email">Email is required</div>
        </div>
        <div class="form-group">
          <label class="form-label">Role</label>
          <select class="form-input" [(ngModel)]="role" name="role">
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="password-wrapper">
            <input [type]="showPassword() ? 'text' : 'password'" class="form-input" [(ngModel)]="password"
                   name="password" placeholder="Create a password" [class.error]="submitted && !password" required />
            <button type="button" class="toggle-pass" (click)="showPassword.set(!showPassword())">
              {{showPassword() ? '🙈' : '👁️'}}
            </button>
          </div>
          <div class="form-error" *ngIf="submitted && !password">Password is required</div>
          <div class="password-strength" *ngIf="password">
            <div class="strength-bar"><div class="strength-fill" [style.width.%]="getStrength()" [style.background]="getStrengthColor()"></div></div>
            <span class="strength-text" [style.color]="getStrengthColor()">{{getStrengthLabel()}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input type="password" class="form-input" [(ngModel)]="confirmPassword" name="confirmPassword"
                 placeholder="Confirm your password" [class.error]="submitted && password !== confirmPassword" required />
          <div class="form-error" *ngIf="submitted && password !== confirmPassword">Passwords do not match</div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg submit-btn">Create Account</button>
      </form>
      <div class="form-footer">
        <p>Already have an account? <a routerLink="/login">Sign in</a></p>
      </div>
    </div>
  `,
  styles: [`
    .register-form { width: 100%; max-width: 420px; }
    .form-header { margin-bottom: 28px; }
    .mobile-logo { font-size: 2rem; display: block; margin-bottom: 12px; }
    .form-header h2 { font-size: 1.75rem; font-weight: 700; margin-bottom: 8px; }
    .form-header p { color: var(--text-secondary); font-size: .95rem; }
    .password-wrapper { position: relative; }
    .toggle-pass { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; }
    .password-strength { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .strength-bar { flex: 1; height: 4px; background: var(--bg-tertiary); border-radius: 2px; overflow: hidden; }
    .strength-fill { height: 100%; border-radius: 2px; transition: all .3s ease; }
    .strength-text { font-size: .75rem; font-weight: 500; }
    .submit-btn { width: 100%; margin-bottom: 24px; }
    .form-footer { text-align: center; }
    .form-footer p { font-size: .9rem; color: var(--text-secondary); }
    .form-footer a { color: var(--primary); font-weight: 600; }
  `]
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  name = '';
  email = '';
  role: 'student' | 'faculty' | 'admin' = 'student';
  password = '';
  confirmPassword = '';
  showPassword = signal(false);
  submitted = false;

  getStrength(): number {
    let s = 0;
    if (this.password.length >= 6) s += 25;
    if (this.password.length >= 10) s += 25;
    if (/[A-Z]/.test(this.password)) s += 25;
    if (/[0-9!@#$%]/.test(this.password)) s += 25;
    return s;
  }
  getStrengthColor(): string {
    const s = this.getStrength();
    if (s <= 25) return 'var(--error)';
    if (s <= 50) return 'var(--warning)';
    if (s <= 75) return 'var(--info)';
    return 'var(--success)';
  }
  getStrengthLabel(): string {
    const s = this.getStrength();
    if (s <= 25) return 'Weak';
    if (s <= 50) return 'Fair';
    if (s <= 75) return 'Good';
    return 'Strong';
  }

  onSubmit() {
    this.submitted = true;
    if (!this.name || !this.email || !this.password || this.password !== this.confirmPassword) return;
    this.auth.register({ name: this.name, email: this.email, role: this.role });
    this.toast.success('Account created successfully!');
    this.router.navigate(['/dashboard']);
  }
}
