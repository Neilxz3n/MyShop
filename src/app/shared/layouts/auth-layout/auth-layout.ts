import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '../../components/toast/toast';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, ToastComponent],
  template: `
    <div class="auth-layout">
      <div class="auth-left">
        <div class="auth-branding">
          <div class="auth-logo">🎓</div>
          <h1>Campus<br>Lost & Found</h1>
          <p>Helping our campus community recover what matters most.</p>
          <div class="auth-stats">
            <div class="auth-stat"><strong>1,200+</strong><span>Items Recovered</span></div>
            <div class="auth-stat"><strong>95%</strong><span>Match Rate</span></div>
            <div class="auth-stat"><strong>5,000+</strong><span>Users</span></div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <router-outlet />
      </div>
    </div>
    <app-toast />
  `,
  styles: [`
    .auth-layout { display: flex; min-height: 100vh; }
    .auth-left {
      flex: 1; background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #7c3aed 100%);
      display: flex; align-items: center; justify-content: center; padding: 40px; position: relative; overflow: hidden;
    }
    .auth-left::before {
      content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%;
      background: rgba(255,255,255,.05); top: -200px; right: -200px;
    }
    .auth-left::after {
      content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%;
      background: rgba(255,255,255,.03); bottom: -150px; left: -100px;
    }
    .auth-branding { position: relative; z-index: 1; color: #fff; max-width: 420px; }
    .auth-logo { font-size: 3rem; margin-bottom: 20px; }
    .auth-branding h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
    .auth-branding p { font-size: 1.1rem; opacity: .85; line-height: 1.6; margin-bottom: 40px; }
    .auth-stats { display: flex; gap: 32px; }
    .auth-stat { display: flex; flex-direction: column; }
    .auth-stat strong { font-size: 1.5rem; font-weight: 700; }
    .auth-stat span { font-size: .8rem; opacity: .7; margin-top: 2px; }
    .auth-right {
      flex: 1; display: flex; align-items: center; justify-content: center;
      padding: 40px; background: var(--bg-primary);
    }
    @media (max-width: 900px) {
      .auth-left { display: none; }
      .auth-right { padding: 24px; }
    }
  `]
})
export class AuthLayoutComponent {}
