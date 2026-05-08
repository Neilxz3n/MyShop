import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="about">
      <!-- Nav -->
      <nav class="about-nav glass">
        <div class="nav-inner">
          <a routerLink="/" class="nav-brand"><span>🎓</span> CampusL&F</a>
          <div class="nav-actions">
            <a routerLink="/login" class="btn btn-ghost">Sign In</a>
            <a routerLink="/register" class="btn btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      <section class="about-hero">
        <div class="hero-inner animate-fade">
          <span class="badge">About Us</span>
          <h1>Making Campus Life<br><span class="gradient-text">a Little Less Stressful</span></h1>
          <p>We're on a mission to eliminate the frustration of losing personal belongings on campus.</p>
        </div>
      </section>

      <section class="about-content">
        <div class="content-inner">
          <div class="about-grid">
            <div class="about-text">
              <h2>Our Mission</h2>
              <p>The Campus Lost & Found Management System was created to streamline the process of reporting, tracking, and recovering lost items within campus communities. We leverage modern technology to connect those who've lost belongings with those who've found them.</p>
              <h2>How It Works</h2>
              <p>Our platform uses smart matching algorithms to automatically connect lost item reports with found item reports. When a potential match is detected, both parties are notified immediately, making the recovery process faster than ever.</p>
            </div>
            <div class="about-values">
              <div *ngFor="let v of values" class="value-card card">
                <span class="v-icon">{{v.icon}}</span>
                <h3>{{v.title}}</h3>
                <p>{{v.desc}}</p>
              </div>
            </div>
          </div>

          <div class="team-section">
            <h2>Our Team</h2>
            <div class="team-grid">
              <div *ngFor="let m of team" class="team-card card">
                <div class="team-avatar" [style.background]="m.color">{{m.name[0]}}</div>
                <h4>{{m.name}}</h4>
                <span>{{m.role}}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <app-footer />
    </div>
  `,
  styles: [`
    .about-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; border-bottom: 1px solid var(--glass-border); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
    .nav-brand { font-weight: 700; font-size: 1.15rem; color: var(--primary); display: flex; align-items: center; gap: 6px; text-decoration: none; }
    .nav-actions { display: flex; gap: 10px; }
    .about-hero { padding: 140px 24px 80px; text-align: center; }
    .hero-inner { max-width: 600px; margin: 0 auto; }
    .badge { display: inline-block; padding: 4px 14px; background: var(--primary-100); color: var(--primary); border-radius: var(--radius-full); font-size: .8rem; font-weight: 600; margin-bottom: 16px; }
    .about-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; }
    .gradient-text { background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .about-hero p { font-size: 1.1rem; color: var(--text-secondary); }
    .content-inner { max-width: 1000px; margin: 0 auto; padding: 0 24px 60px; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
    .about-text h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 12px; }
    .about-text p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; font-size: .95rem; }
    .about-values { display: flex; flex-direction: column; gap: 16px; }
    .value-card { padding: 20px; display: flex; align-items: flex-start; gap: 14px; }
    .v-icon { font-size: 1.5rem; flex-shrink: 0; }
    .value-card h3 { font-size: .9rem; font-weight: 600; margin-bottom: 4px; }
    .value-card p { font-size: .8rem; color: var(--text-secondary); line-height: 1.5; }
    .team-section h2 { text-align: center; font-size: 1.5rem; font-weight: 700; margin-bottom: 32px; }
    .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
    .team-card { padding: 28px; text-align: center; }
    .team-avatar { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.5rem; font-weight: 700; }
    .team-card h4 { font-size: .9rem; margin-bottom: 4px; }
    .team-card span { font-size: .78rem; color: var(--text-tertiary); }
    @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } .about-hero h1 { font-size: 1.8rem; } }
  `]
})
export class AboutComponent {
  values = [
    { icon: '🎯', title: 'Efficiency', desc: 'Streamlined process from report to recovery.' },
    { icon: '🤝', title: 'Community', desc: 'Building trust within our campus family.' },
    { icon: '🔒', title: 'Security', desc: 'Verified claims protect everyone involved.' },
    { icon: '💡', title: 'Innovation', desc: 'Smart technology for smarter solutions.' },
  ];

  team = [
    { name: 'Maria Santos', role: 'Platform Admin', color: '#7c3aed' },
    { name: 'Dr. James Wilson', role: 'Faculty Advisor', color: '#2563eb' },
    { name: 'Alex Rivera', role: 'Student Lead', color: '#10b981' },
    { name: 'Sarah Chen', role: 'UX Designer', color: '#f59e0b' },
  ];
}
