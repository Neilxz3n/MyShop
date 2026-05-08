import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-brand">
              <span class="brand-icon">🎓</span>
              <span class="brand-text">Campus Lost & Found</span>
            </div>
            <p class="footer-desc">A modern platform helping campus communities recover lost items quickly and efficiently.</p>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <a routerLink="/about">About</a>
            <a routerLink="/lost-items">Lost Items</a>
            <a routerLink="/found-items">Found Items</a>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <p>📧 lostandfound&#64;campus.edu</p>
            <p>📞 (555) 123-4567</p>
            <p>📍 Student Affairs Building</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Campus Lost & Found Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: var(--surface); border-top: 1px solid var(--surface-border); margin-top: 60px; }
    .footer-inner { max-width: 1200px; margin: 0 auto; padding: 48px 24px 24px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .footer-brand { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .brand-icon { font-size: 1.5rem; }
    .brand-text { font-weight: 700; font-size: 1.1rem; color: var(--primary); }
    .footer-desc { font-size: .85rem; color: var(--text-secondary); line-height: 1.6; }
    .footer-col h4 { font-size: .85rem; font-weight: 600; margin-bottom: 16px; color: var(--text-primary); }
    .footer-col a { display: block; font-size: .85rem; color: var(--text-secondary); margin-bottom: 10px; text-decoration: none; transition: color var(--transition); }
    .footer-col a:hover { color: var(--primary); }
    .footer-col p { font-size: .85rem; color: var(--text-secondary); margin-bottom: 8px; }
    .footer-bottom { border-top: 1px solid var(--surface-border); padding-top: 20px; text-align: center; }
    .footer-bottom p { font-size: .8rem; color: var(--text-tertiary); }
    @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; gap: 24px; } }
  `]
})
export class FooterComponent {}
