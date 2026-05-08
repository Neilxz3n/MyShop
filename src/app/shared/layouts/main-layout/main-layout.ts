import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ToastComponent } from '../../components/toast/toast';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NavbarComponent, ToastComponent],
  template: `
    <div class="layout">
      <app-sidebar />
      <div class="main-area">
        <app-navbar />
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
    <app-toast />
  `,
  styles: [`
    .layout { display: flex; min-height: 100vh; }
    .main-area {
      flex: 1; margin-left: var(--sidebar-width); transition: margin-left var(--transition-slow);
      display: flex; flex-direction: column;
    }
    .content { flex: 1; padding: 24px; max-width: 1400px; width: 100%; margin: 0 auto; }
    @media (max-width: 768px) {
      .main-area { margin-left: 0; }
      .content { padding: 16px; }
    }
  `]
})
export class MainLayoutComponent {
  auth = inject(AuthService);
}
