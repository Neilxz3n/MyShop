import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="landing">
      <!-- Navbar -->
      <nav class="landing-nav glass">
        <div class="nav-inner">
          <a routerLink="/" class="nav-brand"><span>🎓</span> CampusL&F</a>
          <div class="nav-links hide-mobile">
            <a href="#features">Features</a>
            <a href="#stats">Statistics</a>
            <a href="#testimonials">Testimonials</a>
            <a routerLink="/about">About</a>
          </div>
          <div class="nav-actions">
            <a routerLink="/login" class="btn btn-ghost">Sign In</a>
            <a routerLink="/register" class="btn btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <section class="hero">
        <div class="hero-content animate-fade">
          <span class="hero-badge">🏫 #1 Campus Platform</span>
          <h1>Lost Something on Campus?<br><span class="gradient-text">We'll Help You Find It.</span></h1>
          <p class="hero-desc">The most advanced lost & found management system designed exclusively for campus communities. Report, track, and recover your belongings effortlessly.</p>
          <div class="hero-actions">
            <a routerLink="/register" class="btn btn-primary btn-lg">Report Lost Item →</a>
            <a routerLink="/login" class="btn btn-secondary btn-lg">Browse Found Items</a>
          </div>
          <div class="hero-trust">
            <div class="trust-avatars">
              <span class="trust-avatar" *ngFor="let a of ['A','S','D','J','E']" [style.background]="getColor(a)">{{a}}</span>
            </div>
            <span class="trust-text"><strong>500+</strong> items recovered this semester</span>
          </div>
        </div>
        <div class="hero-visual hide-mobile">
          <div class="hero-card card glass">
            <div class="hc-header"><span class="hc-dot red"></span><span class="hc-dot yellow"></span><span class="hc-dot green"></span></div>
            <div class="hc-body">
              <div class="hc-stat"><span class="hc-num">247</span><span class="hc-label">Lost Items</span></div>
              <div class="hc-stat"><span class="hc-num">312</span><span class="hc-label">Found Items</span></div>
              <div class="hc-stat success"><span class="hc-num">89%</span><span class="hc-label">Recovery Rate</span></div>
            </div>
            <div class="hc-activity">
              <div class="hc-row" *ngFor="let r of heroRows"><span class="hc-icon">{{r.icon}}</span><span class="hc-text">{{r.text}}</span><span class="hc-time">{{r.time}}</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features" id="features">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Features</span>
            <h2>Everything You Need to<br><span class="gradient-text">Recover Lost Items</span></h2>
            <p>Our platform provides a comprehensive suite of tools for the campus community.</p>
          </div>
          <div class="features-grid">
            <div *ngFor="let f of features; let i = index" class="feature-card card" [style.animation-delay]="i * 0.08 + 's'">
              <span class="feature-icon">{{f.icon}}</span>
              <h3>{{f.title}}</h3>
              <p>{{f.desc}}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats-section" id="stats">
        <div class="section-inner">
          <div class="stats-grid">
            <div *ngFor="let s of stats" class="stat-item">
              <span class="stat-num">{{s.value}}</span>
              <span class="stat-label">{{s.label}}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="testimonials" id="testimonials">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-badge">Testimonials</span>
            <h2>Loved by the Campus Community</h2>
          </div>
          <div class="testimonials-grid">
            <div *ngFor="let t of testimonials" class="testimonial-card card">
              <div class="stars">★★★★★</div>
              <p>"{{t.text}}"</p>
              <div class="testimonial-author">
                <div class="author-avatar" [style.background]="t.color">{{t.name[0]}}</div>
                <div><strong>{{t.name}}</strong><span>{{t.role}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-inner">
          <h2>Ready to Find What You've Lost?</h2>
          <p>Join thousands of campus members who trust our platform.</p>
          <a routerLink="/register" class="btn btn-primary btn-lg">Get Started Free →</a>
        </div>
      </section>

      <app-footer />
    </div>
  `,
  styles: [`
    .landing { overflow-x: hidden; }
    .landing-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; border-bottom: 1px solid var(--glass-border); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
    .nav-brand { font-weight: 700; font-size: 1.15rem; color: var(--primary); display: flex; align-items: center; gap: 6px; text-decoration: none; }
    .nav-links { display: flex; gap: 28px; }
    .nav-links a { color: var(--text-secondary); font-size: .9rem; font-weight: 500; text-decoration: none; transition: color var(--transition); }
    .nav-links a:hover { color: var(--primary); }
    .nav-actions { display: flex; gap: 10px; }

    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; gap: 60px; padding: 100px 40px 60px; max-width: 1200px; margin: 0 auto; }
    .hero-content { max-width: 560px; }
    .hero-badge { display: inline-block; padding: 6px 16px; background: var(--primary-100); color: var(--primary); border-radius: var(--radius-full); font-size: .8rem; font-weight: 600; margin-bottom: 20px; }
    .hero h1 { font-size: 3rem; font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
    .gradient-text { background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-desc { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 32px; }
    .hero-actions { display: flex; gap: 12px; margin-bottom: 40px; flex-wrap: wrap; }
    .hero-trust { display: flex; align-items: center; gap: 12px; }
    .trust-avatars { display: flex; }
    .trust-avatar { width: 32px; height: 32px; border-radius: 50%; color: #fff; font-size: .7rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-left: -8px; border: 2px solid var(--bg-primary); }
    .trust-avatar:first-child { margin-left: 0; }
    .trust-text { font-size: .85rem; color: var(--text-secondary); }
    .hero-visual { flex-shrink: 0; }
    .hero-card { width: 380px; padding: 0; overflow: hidden; }
    .hc-header { padding: 12px 16px; border-bottom: 1px solid var(--surface-border); display: flex; gap: 6px; }
    .hc-dot { width: 10px; height: 10px; border-radius: 50%; }
    .red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #10b981; }
    .hc-body { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding: 20px 16px; border-bottom: 1px solid var(--surface-border); }
    .hc-stat { text-align: center; }
    .hc-num { display: block; font-size: 1.5rem; font-weight: 700; }
    .hc-stat.success .hc-num { color: var(--success); }
    .hc-label { font-size: .7rem; color: var(--text-tertiary); }
    .hc-activity { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .hc-row { display: flex; align-items: center; gap: 10px; font-size: .8rem; }
    .hc-icon { font-size: 1rem; }
    .hc-text { flex: 1; color: var(--text-secondary); }
    .hc-time { font-size: .7rem; color: var(--text-tertiary); }

    .section-inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .section-header { text-align: center; margin-bottom: 48px; }
    .section-badge { display: inline-block; padding: 4px 14px; background: var(--primary-100); color: var(--primary); border-radius: var(--radius-full); font-size: .8rem; font-weight: 600; margin-bottom: 12px; }
    .section-header h2 { font-size: 2rem; font-weight: 700; margin-bottom: 12px; }
    .section-header p { color: var(--text-secondary); font-size: 1rem; max-width: 500px; margin: 0 auto; }

    .features { background: var(--bg-secondary); }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
    .feature-card { padding: 28px; text-align: center; animation: fadeIn .5s ease both; }
    .feature-card:hover { transform: translateY(-4px); }
    .feature-icon { font-size: 2rem; display: block; margin-bottom: 14px; }
    .feature-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
    .feature-card p { font-size: .85rem; color: var(--text-secondary); line-height: 1.5; }

    .stats-section { background: linear-gradient(135deg, #1e3a5f, #2563eb, #7c3aed); }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 32px; text-align: center; }
    .stat-num { display: block; font-size: 2.5rem; font-weight: 800; color: #fff; }
    .stat-label { font-size: .9rem; color: rgba(255,255,255,.75); }

    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .testimonial-card { padding: 28px; }
    .stars { color: #f59e0b; margin-bottom: 14px; letter-spacing: 2px; }
    .testimonial-card p { font-size: .9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; }
    .testimonial-author { display: flex; align-items: center; gap: 12px; }
    .author-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; flex-shrink: 0; }
    .testimonial-author strong { display: block; font-size: .85rem; }
    .testimonial-author span { font-size: .75rem; color: var(--text-tertiary); }

    .cta-section { text-align: center; padding: 80px 24px; }
    .cta-inner { max-width: 600px; margin: 0 auto; }
    .cta-section h2 { font-size: 2rem; font-weight: 700; margin-bottom: 12px; }
    .cta-section p { color: var(--text-secondary); margin-bottom: 28px; font-size: 1.05rem; }

    @media (max-width: 768px) {
      .hero { flex-direction: column; padding: 100px 20px 40px; gap: 40px; text-align: center; }
      .hero h1 { font-size: 2rem; }
      .hero-actions { justify-content: center; }
      .hero-trust { justify-content: center; }
      .section-header h2 { font-size: 1.5rem; }
    }
  `]
})
export class LandingComponent {
  heroRows = [
    { icon: '🔍', text: 'MacBook Pro reported lost at Library', time: '2m ago' },
    { icon: '📦', text: 'Student ID found at Cafeteria', time: '15m ago' },
    { icon: '✅', text: 'Car keys claimed by Prof. Okafor', time: '1h ago' },
    { icon: '🔗', text: 'New match: Backpack (87%)', time: '2h ago' },
  ];

  features = [
    { icon: '📝', title: 'Easy Reporting', desc: 'Report lost or found items in seconds with our intuitive forms.' },
    { icon: '🤖', title: 'Smart Matching', desc: 'AI-powered matching automatically connects lost items with found ones.' },
    { icon: '🔔', title: 'Instant Notifications', desc: 'Get notified immediately when a potential match is found.' },
    { icon: '✅', title: 'Claim Management', desc: 'Streamlined verification and claim process for item recovery.' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Track campus-wide trends and recovery statistics.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your personal information is protected and verified.' },
  ];

  stats = [
    { value: '5,000+', label: 'Active Users' },
    { value: '1,200+', label: 'Items Recovered' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '< 24hrs', label: 'Avg Recovery Time' },
  ];

  testimonials = [
    { text: 'I lost my laptop in the library and had it back within a day thanks to this system. Amazing!', name: 'Alex Rivera', role: 'CS Student', color: '#2563eb' },
    { text: 'As an admin, managing lost and found has never been easier. The dashboard gives us great insights.', name: 'Maria Santos', role: 'Student Affairs', color: '#7c3aed' },
    { text: 'The smart matching feature found my keys before I even knew someone had turned them in!', name: 'Dr. James Wilson', role: 'Engineering Faculty', color: '#10b981' },
  ];

  getColor(letter: string): string {
    const colors: Record<string, string> = { A: '#2563eb', S: '#7c3aed', D: '#10b981', J: '#f59e0b', E: '#ef4444' };
    return colors[letter] || '#2563eb';
  }
}
